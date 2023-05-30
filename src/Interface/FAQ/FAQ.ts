export interface INTF_FAQ {
    faq_id: number;
    faq_title: string;
    faq_body: string;
    faq_type: 'Service' | 'Lesson' | 'Homework' | 'Conversation';
}
