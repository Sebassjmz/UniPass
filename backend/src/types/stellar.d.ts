export interface StellarAccount {
    publicKey: string;
    secretKey?: string;
}

export interface StellarTransaction {
    hash: string;
    status: 'pending' | 'success' | 'failed';
    timestamp: Date;
}

export interface ContractCallParams {
    method: string;
    args: any[];
}