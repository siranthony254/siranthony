import { defineType, defineField } from 'sanity'

// Written by the server, not by hand. Read-only in the Studio so a stray edit
// cannot hand someone access or wipe a payment record.
export const purchaseSchema = defineType({
  name: 'purchase',
  title: 'Purchase',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'ebook', title: 'Ebook', type: 'reference', to: [{ type: 'ebook' }] }),
    defineField({ name: 'ebookTitle', title: 'Ebook title', type: 'string' }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
        ],
      },
    }),

    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'buyerName', title: 'Buyer name', type: 'string' }),
    defineField({ name: 'amount', title: 'Amount (KES)', type: 'number' }),

    defineField({ name: 'checkoutRequestId', title: 'Checkout Request ID', type: 'string' }),
    defineField({ name: 'merchantRequestId', title: 'Merchant Request ID', type: 'string' }),
    defineField({ name: 'mpesaReceipt', title: 'M-Pesa receipt', type: 'string' }),
    defineField({ name: 'resultDesc', title: 'Result description', type: 'string' }),

    // Only HMACs of the access tokens are stored, never the tokens. A purchase
    // can hold more than one: the browser gets one at checkout, the emailed
    // link is a second, and any future re-send adds another. None of them can
    // be read back out of here.
    defineField({
      name: 'accessTokenHashes',
      title: 'Access token hashes',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({ name: 'downloadCount', title: 'Downloads', type: 'number' }),
    defineField({ name: 'createdAt', title: 'Created', type: 'datetime' }),
    defineField({ name: 'paidAt', title: 'Paid at', type: 'datetime' }),
  ],

  orderings: [
    { title: 'Newest', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] },
  ],

  preview: {
    select: {
      title: 'ebookTitle',
      status: 'status',
      phone: 'phone',
      receipt: 'mpesaReceipt',
      amount: 'amount',
    },
    prepare: ({ title, status, phone, receipt, amount }: any) => ({
      title: `${status === 'paid' ? '✅' : status === 'failed' ? '✕' : '…'} ${title || 'Purchase'}`,
      subtitle: [phone, amount ? `KES ${amount}` : null, receipt].filter(Boolean).join(' · '),
    }),
  },
})
