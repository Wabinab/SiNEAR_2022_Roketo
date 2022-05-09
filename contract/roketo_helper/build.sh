#!/bin/bash
set -e

export WASM=roketo_helper.wasm

RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release
cp target/wasm32-unknown-unknown/release/$WASM res/
mv res/$WASM res/output_s.wasm

# I don't have wasm-opt in this computer right now, so we'll skip. 
# wasm-opt -Os -o res/output_s.wasm res/$WASM
ls res -lh