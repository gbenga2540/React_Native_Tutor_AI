export interface INTF_ChatGPT {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
