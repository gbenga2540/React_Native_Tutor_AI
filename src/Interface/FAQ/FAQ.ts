export type INTF_FAQTypes =
    | 'All FAQs'
    | 'Why Tutor.AI?'
    | 'Features'
    | 'Free Trial'
    | 'Subscriptions'
    | 'Payment'
    | 'Cancellation & Refund'
    | 'Discounts & Promotions'
    | 'Troubleshooting';

export interface INTF_FAQ {
    faq_id: number;
    faq_title: string;
    faq_body: string;
    faq_type: INTF_FAQTypes;
}
