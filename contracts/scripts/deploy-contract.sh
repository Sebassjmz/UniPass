#!/bin/bash

# Script de deployment del contrato de Stellar
# Uso: ./deploy-contract.sh [testnet|mainnet]

NETWORK=${1:-testnet}

echo "======================================"
echo "Deploying Access Control Contract"
echo "Network: $NETWORK"
echo "======================================"

# Verificar que Soroban CLI esté instalado
if ! command -v soroban &> /dev/null
then
    echo "Error: Soroban CLI no está instalado"
    echo "Instalar con: cargo install --locked soroban-cli"
    exit 1
fi

# Build del contrato
echo "Building contract..."
cd contracts
soroban contract build

if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi

# Deploy del contrato
echo "Deploying to $NETWORK..."
CONTRACT_ID=$(soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/access_control.wasm \
    --network $NETWORK \
    --source admin)

if [ $? -ne 0 ]; then
    echo "Error: Deployment failed"
    exit 1
fi

echo "======================================"
echo "Contract deployed successfully!"
echo "Contract ID: $CONTRACT_ID"
echo "Network: $NETWORK"
echo "======================================"
echo ""
echo "Add this to your .env file:"
echo "STELLAR_CONTRACT_ID=$CONTRACT_ID"
echo "STELLAR_NETWORK=$NETWORK"

# Guardar contract ID
echo $CONTRACT_ID > deployed_contract_id.txt

exit 0