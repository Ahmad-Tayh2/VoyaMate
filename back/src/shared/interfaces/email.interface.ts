export interface SendMailObjectBase {
    type: "account" | "member";
    to: string;
}

export interface AccountConfirmationMail extends SendMailObjectBase {
    type: "account";
    
}

export interface MemberRequestMail extends SendMailObjectBase {
    type: "member";
    memberDetails?: {
        role: string;
    }; 
}

export type SendMailObject = AccountConfirmationMail | MemberRequestMail;
