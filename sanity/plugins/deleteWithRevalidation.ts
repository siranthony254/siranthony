import { definePlugin } from 'sanity'
import { TrashIcon } from '@sanity/icons'
import * as React from 'react'
import { useClient, useDocumentOperation } from 'sanity'

/**
 * Custom Delete Action Plugin for Sanity Studio
 * 
 * This plugin adds a prominent delete button to all document types that:
 * 1. Deletes the document from Sanity storage
 * 2. Triggers a webhook to revalidate the Next.js site
 * 
 * The action appears in the document action menu (three dots menu) in the top right corner.
 */

// Types for the webhook payload
interface WebhookPayload {
  type: 'deleteDocument'
  documentId: string
  documentType: string
  timestamp: string
}

/**
 * Delete action component that uses Sanity's document operation
 */
function DeleteWithRevalidationAction(props: { type: string; id: string; draft: boolean; published: boolean }) {
  const { type, id, published } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const { delete: deleteOperation } = useDocumentOperation(type, id)

  // Only show for published documents
  if (!published) {
    return null
  }

  // Don't show for singleton documents (like siteSettings)
  if (id === 'siteSettings') {
    return null
  }

  const handleDelete = React.useCallback(async () => {
    const confirmed = confirm(
      `Are you sure you want to delete this ${type} document? This action cannot be undone and will sync changes across your site.`
    )

    if (!confirmed) return

    try {
      // First, trigger the revalidation webhook
      const webhookUrl = process.env.NEXT_PUBLIC_SITE_URL 
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
        : '/api/revalidate'

      const payload: WebhookPayload = {
        type: 'deleteDocument',
        documentId: id,
        documentType: type,
        timestamp: new Date().toISOString(),
      }

      // Fire and forget - don't wait for the webhook to complete
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sanity-Secret': process.env.SANITY_WEBHOOK_SECRET || '',
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.warn('Failed to trigger revalidation webhook:', error)
      })

      // Then perform the actual delete using Sanity's document operation
      await deleteOperation.execute()

      console.log(`Document ${id} deleted and revalidation triggered`)
    } catch (error) {
      console.error('Error during delete operation:', error)
      alert('An error occurred while deleting the document. Please try again.')
    }
  }, [deleteOperation, id, type])

  return {
    label: 'Delete & Sync',
    onHandle: handleDelete,
    icon: TrashIcon,
  }
}

/**
 * Document actions resolver that adds our custom delete action
 */
function customDocumentActions(
  prev: Array<{ label: string; onHandle: () => void; icon: React.ComponentType } | null>,
  context: { type: string; id: string; draft: boolean; published: boolean }
) {
  const actions = [...prev]
  
  // Add our custom delete action for all document types except singletons
  if (context.id !== 'siteSettings' && context.published) {
    const deleteAction = DeleteWithRevalidationAction(context)
    if (deleteAction) {
      actions.push(deleteAction)
    }
  }

  return actions
}

/**
 * Plugin configuration for delete with revalidation
 */
export const deleteWithRevalidation = definePlugin(() => {
  return {
    name: 'delete-with-revalidation',
    document: {
      actions: customDocumentActions,
    },
  }
})
