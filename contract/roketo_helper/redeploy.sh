#!/bin/bash

bash build.sh
export CONTRACT=roketo_helper.wabinab.testnet

near delete $CONTRACT wabinab.testnet
near create-account $CONTRACT --masterAccount wabinab.testnet --initialBalance 4.5

near deploy --accountId $CONTRACT --wasmFile res/output_s.wasm