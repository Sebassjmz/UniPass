# Contrato de Control de Acceso en Stellar

## Descripción
Contrato inteligente para registro descentralizado de accesos usando Soroban (Stellar Smart Contracts).

## Funciones principales

### recordAccess
Registra un evento de acceso en la blockchain.

**Parámetros:**
- `user_id`: String - ID del usuario
- `timestamp`: u64 - Timestamp Unix
- `location`: String - Ubicación
- `action`: String - entry/exit

**Retorna:** `transaction_hash: String`

### verifyAccess
Verifica un acceso registrado.

**Parámetros:** `transaction_hash: String`

**Retorna:** `AccessRecord` con datos del acceso

### getAccessHistory
Obtiene historial de accesos de un usuario.

**Parámetros:**
- `user_id`: String
- `limit`: u32 (default: 10)

**Retorna:** `Vec<AccessRecord>`

### revokeAccess (solo admin)
Revoca un registro de acceso.

**Parámetros:**
- `transaction_hash`: String
- `reason`: String

## Estructuras
```rust
struct AccessRecord {
    user_id: String,
    timestamp: u64,
    location: String,
    action: String,
    verified: bool,
    revoked: bool,
    transaction_hash: String,
}
```

## Seguridad
- Solo hashes y referencias, NO datos personales
- Validación de timestamps
- Rate limiting
- Control de roles (admin/guard/student)

## Deployment

### Testnet
```bash
soroban contract build
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/access_control.wasm --network testnet
```

### Mainnet
```bash
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/access_control.wasm --network mainnet
```

## Costos estimados
- ~0.00001 XLM por registro
- Considerar batching para optimizar

## Notas de implementación
- Implementar cuando el backend esté funcionando
- Probar primero en testnet
- Migrar a mainnet después de pruebas exhaustivas