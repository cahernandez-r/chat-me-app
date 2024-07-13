import { MessageDTO } from "./message-dto";

export interface ChatRoom {
    existChat?: boolean;
    uuidChat: string;
    idSender?: number;
    idRecipient?: number;
    messages?: MessageDTO[];
}