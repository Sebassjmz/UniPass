// Cuando e tenga el contrato llenamos esto

export const stellarConfig = {
    networkPassphrase: process.env.STELLAR_NETWORK || 'Test SDF Network ; September 2015',
    horizonUrl: process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
    contractId: process.env.STELLAR_CONTRACT_ID || '',
};

// Funciones placeholder para cuando pongamos el contrato
export const initializeStellarClient = () => {
    console.log('Stellar client no configurado aún');
};