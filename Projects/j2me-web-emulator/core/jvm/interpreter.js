function signedByte(value) {
  return value > 127 ? value - 256 : value;
}

function signedShort(high, low) {
  const value = (high << 8) | low;
  return value > 0x7fff ? value - 0x10000 : value;
}

function branch(code, pc) {
  return signedShort(code[pc], code[pc + 1]);
}

function createJvmArray(length, componentType, initialValue) {
  return {
    __isArray: true,
    componentType,
    elements: new Array(Math.max(0, length | 0)).fill(initialValue),
  };
}

function ensureJvmArray(value) {
  if (!value || !value.__isArray || !Array.isArray(value.elements)) {
    throw new Error("Expected JVM array reference");
  }
  return value;
}

export function executeMethod(jvm, method, thisValue, args) {
  if (!method.code) {
    return undefined;
  }

  const locals = new Array(
    Math.max(method.maxLocals, args.length + (method.isStatic ? 0 : 1), 8),
  ).fill(null);
  const stack = [];
  let pc = 0;

  if (!method.isStatic) {
    locals[0] = thisValue;
  }

  for (let i = 0; i < args.length; i++) {
    locals[method.isStatic ? i : i + 1] = args[i];
  }

  const code = method.code;

  while (pc < code.length) {
    const op = code[pc++];

    switch (op) {
      // nop
      case 0x00:
        break;

      // aconst_null
      case 0x01:
        stack.push(null);
        break;

      // iconst_m1
      case 0x02:
        stack.push(-1);
        break;

      // iconst_0..iconst_5
      case 0x03:
      case 0x04:
      case 0x05:
      case 0x06:
      case 0x07:
      case 0x08:
        stack.push(op - 0x03);
        break;

      // lconst_0, lconst_1
      case 0x09:
      case 0x0a:
        stack.push(op === 0x09 ? 0 : 1);
        break;

      // fconst_0, fconst_1, fconst_2
      case 0x0b:
      case 0x0c:
      case 0x0d:
        stack.push(op - 0x0b);
        break;

      // dconst_0, dconst_1
      case 0x0e:
      case 0x0f:
        stack.push(op - 0x0e);
        break;

      // bipush
      case 0x10:
        stack.push(signedByte(code[pc++]));
        break;

      // sipush
      case 0x11: {
        const value = signedShort(code[pc++], code[pc++]);
        stack.push(value);
        break;
      }

      // ldc
      case 0x12:
        stack.push(method.owner.resolveConstant(code[pc++]));
        break;

      // ldc_w
      case 0x13: {
        const index = (code[pc++] << 8) | code[pc++];
        stack.push(method.owner.resolveConstant(index));
        break;
      }

      // ldc2_w
      case 0x14: {
        const index = (code[pc++] << 8) | code[pc++];
        stack.push(method.owner.resolveConstant(index));
        break;
      }

      // iload, lload, fload, dload, aload
      case 0x15:
      case 0x16:
      case 0x17:
      case 0x18:
      case 0x19:
        stack.push(locals[code[pc++]]);
        break;

      // iload_0..iload_3
      case 0x1a:
      case 0x1b:
      case 0x1c:
      case 0x1d:
        stack.push(locals[op - 0x1a]);
        break;

      // lload_0..lload_3
      case 0x1e:
      case 0x1f:
      case 0x20:
      case 0x21:
        stack.push(locals[op - 0x1e]);
        break;

      // fload_0..fload_3
      case 0x22:
      case 0x23:
      case 0x24:
      case 0x25:
        stack.push(locals[op - 0x22]);
        break;

      // dload_0..dload_3
      case 0x26:
      case 0x27:
      case 0x28:
      case 0x29:
        stack.push(locals[op - 0x26]);
        break;

      // aload_0..aload_3
      case 0x2a:
      case 0x2b:
      case 0x2c:
      case 0x2d:
        stack.push(locals[op - 0x2a]);
        break;

      // iaload, laload, faload, daload, aaload, baload, caload, saload
      case 0x2e:
      case 0x2f:
      case 0x30:
      case 0x31:
      case 0x32:
      case 0x33:
      case 0x34:
      case 0x35: {
        const index = stack.pop() | 0;
        const arrayRef = ensureJvmArray(stack.pop());
        stack.push(arrayRef.elements[index] ?? 0);
        break;
      }

      // istore, lstore, fstore, dstore, astore
      case 0x36:
      case 0x37:
      case 0x38:
      case 0x39:
      case 0x3a:
        locals[code[pc++]] = stack.pop();
        break;

      // istore_0..istore_3
      case 0x3b:
      case 0x3c:
      case 0x3d:
      case 0x3e:
        locals[op - 0x3b] = stack.pop();
        break;

      // lstore_0..lstore_3
      case 0x3f:
      case 0x40:
      case 0x41:
      case 0x42:
        locals[op - 0x3f] = stack.pop();
        break;

      // fstore_0..fstore_3
      case 0x43:
      case 0x44:
      case 0x45:
      case 0x46:
        locals[op - 0x43] = stack.pop();
        break;

      // dstore_0..dstore_3
      case 0x47:
      case 0x48:
      case 0x49:
      case 0x4a:
        locals[op - 0x47] = stack.pop();
        break;

      // astore_0..astore_3
      case 0x4b:
      case 0x4c:
      case 0x4d:
      case 0x4e:
        locals[op - 0x4b] = stack.pop();
        break;

      // iastore, lastore, fastore, dastore, aastore, bastore, castore, sastore
      case 0x4f:
      case 0x50:
      case 0x51:
      case 0x52:
      case 0x53:
      case 0x54:
      case 0x55:
      case 0x56: {
        const value = stack.pop();
        const index = stack.pop() | 0;
        const arrayRef = ensureJvmArray(stack.pop());
        arrayRef.elements[index] = value;
        break;
      }

      // pop
      case 0x57:
        stack.pop();
        break;

      // pop2
      case 0x58:
        stack.pop();
        if (stack.length) stack.pop();
        break;

      // dup
      case 0x59:
        stack.push(stack[stack.length - 1]);
        break;

      // dup_x1
      case 0x5a: {
        const v1 = stack.pop();
        const v2 = stack.pop();
        stack.push(v1, v2, v1);
        break;
      }

      // dup_x2
      case 0x5b: {
        const v1 = stack.pop();
        const v2 = stack.pop();
        const v3 = stack.pop();
        stack.push(v1, v3, v2, v1);
        break;
      }

      // dup2
      case 0x5c: {
        const v1 = stack[stack.length - 1];
        const v2 = stack[stack.length - 2];
        stack.push(v2, v1);
        break;
      }

      // dup2_x1
      case 0x5d: {
        const v1 = stack.pop();
        const v2 = stack.pop();
        const v3 = stack.pop();
        stack.push(v2, v1, v3, v2, v1);
        break;
      }

      // dup2_x2
      case 0x5e: {
        const v1 = stack.pop();
        const v2 = stack.pop();
        const v3 = stack.pop();
        const v4 = stack.pop();
        stack.push(v2, v1, v4, v3, v2, v1);
        break;
      }

      // swap
      case 0x5f: {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(a, b);
        break;
      }

      // iadd
      case 0x60:
        stack.push(((stack.pop() | 0) + (stack.pop() | 0)) | 0);
        break;

      // ladd
      case 0x61: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a + b);
        break;
      }

      // fadd
      case 0x62: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(Math.fround(a + b));
        break;
      }

      // dadd
      case 0x63: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a + b);
        break;
      }

      // isub
      case 0x64: {
        const right = stack.pop() | 0;
        const left = stack.pop() | 0;
        stack.push((left - right) | 0);
        break;
      }

      // lsub
      case 0x65: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a - b);
        break;
      }

      // fsub
      case 0x66: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(Math.fround(a - b));
        break;
      }

      // dsub
      case 0x67: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a - b);
        break;
      }

      // imul
      case 0x68:
        stack.push(Math.imul(stack.pop() | 0, stack.pop() | 0));
        break;

      // lmul
      case 0x69: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a * b);
        break;
      }

      // fmul
      case 0x6a: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(Math.fround(a * b));
        break;
      }

      // dmul
      case 0x6b: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a * b);
        break;
      }

      // idiv
      case 0x6c: {
        const divisor = stack.pop() | 0;
        const dividend = stack.pop() | 0;
        if (divisor === 0) throw new Error("Division by zero");
        stack.push((dividend / divisor) | 0);
        break;
      }

      // ldiv
      case 0x6d: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (b === 0) throw new Error("Division by zero");
        stack.push(Math.trunc(a / b));
        break;
      }

      // fdiv
      case 0x6e: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(Math.fround(a / b));
        break;
      }

      // ddiv
      case 0x6f: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a / b);
        break;
      }

      // irem
      case 0x70: {
        const divisor = stack.pop() | 0;
        const dividend = stack.pop() | 0;
        if (divisor === 0) throw new Error("Division by zero");
        stack.push((dividend % divisor) | 0);
        break;
      }

      // lrem
      case 0x71: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (b === 0) throw new Error("Division by zero");
        stack.push(a % b);
        break;
      }

      // frem
      case 0x72: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(Math.fround(a % b));
        break;
      }

      // drem
      case 0x73: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a % b);
        break;
      }

      // ineg
      case 0x74:
        stack.push(-(stack.pop() | 0) | 0);
        break;

      // lneg
      case 0x75:
        stack.push(-Number(stack.pop() ?? 0));
        break;

      // fneg
      case 0x76:
        stack.push(-Number(stack.pop() ?? 0));
        break;

      // dneg
      case 0x77:
        stack.push(-Number(stack.pop() ?? 0));
        break;

      // ishl
      case 0x78: {
        const shift = (stack.pop() | 0) & 0x1f;
        const value = stack.pop() | 0;
        stack.push(value << shift);
        break;
      }

      // lshl
      case 0x79: {
        const shift = (stack.pop() | 0) & 0x3f;
        const value = Number(stack.pop() ?? 0);
        // approximate for JS
        stack.push(value * Math.pow(2, shift));
        break;
      }

      // ishr
      case 0x7a: {
        const shift = (stack.pop() | 0) & 0x1f;
        const value = stack.pop() | 0;
        stack.push(value >> shift);
        break;
      }

      // lshr
      case 0x7b: {
        const shift = (stack.pop() | 0) & 0x3f;
        const value = Number(stack.pop() ?? 0);
        stack.push(Math.trunc(value / Math.pow(2, shift)));
        break;
      }

      // iushr
      case 0x7c: {
        const shift = (stack.pop() | 0) & 0x1f;
        const value = stack.pop() | 0;
        stack.push(value >>> shift);
        break;
      }

      // lushr
      case 0x7d: {
        const shift = (stack.pop() | 0) & 0x3f;
        const value = Number(stack.pop() ?? 0);
        stack.push(Math.trunc(value / Math.pow(2, shift)));
        break;
      }

      // iand
      case 0x7e: {
        const right = stack.pop() | 0;
        const left = stack.pop() | 0;
        stack.push(left & right);
        break;
      }

      // land
      case 0x7f: {
        const b = stack.pop() | 0;
        const a = stack.pop() | 0;
        stack.push(a & b);
        break;
      }

      // ior
      case 0x80: {
        const right = stack.pop() | 0;
        const left = stack.pop() | 0;
        stack.push(left | right);
        break;
      }

      // lor
      case 0x81: {
        const b = stack.pop() | 0;
        const a = stack.pop() | 0;
        stack.push(a | b);
        break;
      }

      // ixor
      case 0x82: {
        const right = stack.pop() | 0;
        const left = stack.pop() | 0;
        stack.push(left ^ right);
        break;
      }

      // lxor
      case 0x83: {
        const b = stack.pop() | 0;
        const a = stack.pop() | 0;
        stack.push(a ^ b);
        break;
      }

      // iinc
      case 0x84: {
        const index = code[pc++];
        const increment = signedByte(code[pc++]);
        locals[index] = ((locals[index] ?? 0) | 0) + increment;
        break;
      }

      // i2l
      case 0x85:
        stack.push(stack.pop() | 0);
        break;

      // i2f
      case 0x86:
        stack.push(Math.fround(stack.pop() | 0));
        break;

      // i2d
      case 0x87:
        stack.push(Number(stack.pop() | 0));
        break;

      // l2i
      case 0x88:
        stack.push(Number(stack.pop() ?? 0) | 0);
        break;

      // l2f
      case 0x89:
        stack.push(Math.fround(Number(stack.pop() ?? 0)));
        break;

      // l2d
      case 0x8a:
        stack.push(Number(stack.pop() ?? 0));
        break;

      // f2i
      case 0x8b:
        stack.push(Math.trunc(Number(stack.pop() ?? 0)) | 0);
        break;

      // f2l
      case 0x8c:
        stack.push(Math.trunc(Number(stack.pop() ?? 0)));
        break;

      // f2d
      case 0x8d:
        stack.push(Number(stack.pop() ?? 0));
        break;

      // d2i
      case 0x8e:
        stack.push(Math.trunc(Number(stack.pop() ?? 0)) | 0);
        break;

      // d2l
      case 0x8f:
        stack.push(Math.trunc(Number(stack.pop() ?? 0)));
        break;

      // d2f
      case 0x90:
        stack.push(Math.fround(Number(stack.pop() ?? 0)));
        break;

      // i2b
      case 0x91: {
        const value = stack.pop() | 0;
        stack.push((value << 24) >> 24);
        break;
      }

      // i2c
      case 0x92: {
        const value = stack.pop() | 0;
        stack.push(value & 0xffff);
        break;
      }

      // i2s
      case 0x93: {
        const value = stack.pop() | 0;
        stack.push((value << 16) >> 16);
        break;
      }

      // lcmp
      case 0x94: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        stack.push(a > b ? 1 : a < b ? -1 : 0);
        break;
      }

      // fcmpl
      case 0x95: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (isNaN(a) || isNaN(b)) stack.push(-1);
        else stack.push(a > b ? 1 : a < b ? -1 : 0);
        break;
      }

      // fcmpg
      case 0x96: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (isNaN(a) || isNaN(b)) stack.push(1);
        else stack.push(a > b ? 1 : a < b ? -1 : 0);
        break;
      }

      // dcmpl
      case 0x97: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (isNaN(a) || isNaN(b)) stack.push(-1);
        else stack.push(a > b ? 1 : a < b ? -1 : 0);
        break;
      }

      // dcmpg
      case 0x98: {
        const b = Number(stack.pop() ?? 0);
        const a = Number(stack.pop() ?? 0);
        if (isNaN(a) || isNaN(b)) stack.push(1);
        else stack.push(a > b ? 1 : a < b ? -1 : 0);
        break;
      }

      // ifeq
      case 0x99: {
        const offset = branch(code, pc);
        pc += 2;
        if ((stack.pop() | 0) === 0) pc += offset - 3;
        break;
      }

      // ifne
      case 0x9a: {
        const offset = branch(code, pc);
        pc += 2;
        if ((stack.pop() | 0) !== 0) pc += offset - 3;
        break;
      }

      // iflt, ifge, ifgt, ifle
      case 0x9b:
      case 0x9c:
      case 0x9d:
      case 0x9e: {
        const offset = branch(code, pc);
        pc += 2;
        const value = stack.pop() | 0;
        const matched =
          (op === 0x9b && value < 0) ||
          (op === 0x9c && value >= 0) ||
          (op === 0x9d && value > 0) ||
          (op === 0x9e && value <= 0);
        if (matched) pc += offset - 3;
        break;
      }

      // if_icmpeq..if_icmple, if_acmpeq, if_acmpne
      case 0x9f:
      case 0xa0:
      case 0xa1:
      case 0xa2:
      case 0xa3:
      case 0xa4:
      case 0xa5:
      case 0xa6: {
        const offset = branch(code, pc);
        pc += 2;
        const rightRaw = stack.pop();
        const leftRaw = stack.pop();
        const right = rightRaw | 0;
        const left = leftRaw | 0;
        const matched =
          (op === 0x9f && left === right) ||
          (op === 0xa0 && left !== right) ||
          (op === 0xa1 && left < right) ||
          (op === 0xa2 && left >= right) ||
          (op === 0xa3 && left > right) ||
          (op === 0xa4 && left <= right) ||
          (op === 0xa5 && leftRaw === rightRaw) ||
          (op === 0xa6 && leftRaw !== rightRaw);
        if (matched) pc += offset - 3;
        break;
      }

      // goto
      case 0xa7: {
        const offset = branch(code, pc);
        pc += offset - 1;
        break;
      }

      // jsr
      case 0xa8: {
        const offset = branch(code, pc);
        pc += 2;
        stack.push(pc);
        pc += offset - 3;
        break;
      }

      // ret
      case 0xa9: {
        pc = locals[code[pc]] | 0;
        break;
      }

      // tableswitch
      case 0xaa: {
        const startPc = pc - 1;
        // Align to 4-byte boundary
        while (pc % 4 !== 0) pc++;
        const defaultOffset =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;
        const low =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;
        const high =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;

        const index = stack.pop() | 0;
        if (index >= low && index <= high) {
          const tableIndex = (index - low) * 4;
          const offset =
            (code[pc + tableIndex] << 24) |
            (code[pc + tableIndex + 1] << 16) |
            (code[pc + tableIndex + 2] << 8) |
            code[pc + tableIndex + 3];
          pc = startPc + offset;
        } else {
          pc = startPc + defaultOffset;
        }
        break;
      }

      // lookupswitch
      case 0xab: {
        const startPc = pc - 1;
        while (pc % 4 !== 0) pc++;
        const defaultOffset =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;
        const npairs =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;

        const key = stack.pop() | 0;
        let found = false;
        for (let i = 0; i < npairs; i++) {
          const matchVal =
            (code[pc] << 24) |
            (code[pc + 1] << 16) |
            (code[pc + 2] << 8) |
            code[pc + 3];
          pc += 4;
          const offset =
            (code[pc] << 24) |
            (code[pc + 1] << 16) |
            (code[pc + 2] << 8) |
            code[pc + 3];
          pc += 4;
          if (key === matchVal) {
            pc = startPc + offset;
            found = true;
            break;
          }
        }
        if (!found) {
          pc = startPc + defaultOffset;
        }
        break;
      }

      // ireturn, lreturn, freturn, dreturn, areturn
      case 0xac:
      case 0xad:
      case 0xae:
      case 0xaf:
      case 0xb0:
        return stack.pop();

      // return (void)
      case 0xb1:
        return undefined;

      // getstatic
      case 0xb2: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        stack.push(jvm.getStaticField(ref.owner, ref.name, ref.descriptor));
        break;
      }

      // putstatic
      case 0xb3: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        jvm.setStaticField(ref.owner, ref.name, ref.descriptor, stack.pop());
        break;
      }

      // getfield
      case 0xb4: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        const target = stack.pop();
        if (target == null) {
          stack.push(null);
        } else {
          stack.push(jvm.getField(target, ref.owner, ref.name, ref.descriptor));
        }
        break;
      }

      // putfield
      case 0xb5: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        const value = stack.pop();
        const target = stack.pop();
        if (target != null) {
          jvm.setField(target, ref.owner, ref.name, ref.descriptor, value);
        }
        break;
      }

      // invokevirtual, invokespecial, invokestatic
      case 0xb6:
      case 0xb7:
      case 0xb8: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        const argTypes = jvm.getMethodArgumentTypes(ref.descriptor);
        const invokeArgs = new Array(argTypes.length);

        for (let i = argTypes.length - 1; i >= 0; i--) {
          invokeArgs[i] = stack.pop();
        }

        let result;
        if (op === 0xb8) {
          result = jvm.invokeStatic(
            ref.owner,
            ref.name,
            ref.descriptor,
            invokeArgs,
          );
        } else {
          const target = stack.pop();
          if (op === 0xb7) {
            result = jvm.invokeSpecial(
              target,
              ref.owner,
              ref.name,
              ref.descriptor,
              invokeArgs,
            );
          } else {
            result = jvm.invokeVirtual(
              target,
              ref.name,
              ref.descriptor,
              invokeArgs,
            );
          }
        }

        if (jvm.getMethodReturnType(ref.descriptor) !== "V") {
          stack.push(result);
        }
        break;
      }

      // invokeinterface
      case 0xb9: {
        const ref = method.owner.resolveMemberRef(
          (code[pc++] << 8) | code[pc++],
        );
        const count = code[pc++]; // argument count (unused in our impl)
        code[pc++]; // must be 0

        const argTypes = jvm.getMethodArgumentTypes(ref.descriptor);
        const invokeArgs = new Array(argTypes.length);

        for (let i = argTypes.length - 1; i >= 0; i--) {
          invokeArgs[i] = stack.pop();
        }

        const target = stack.pop();
        const result = jvm.invokeVirtual(
          target,
          ref.name,
          ref.descriptor,
          invokeArgs,
        );

        if (jvm.getMethodReturnType(ref.descriptor) !== "V") {
          stack.push(result);
        }
        break;
      }

      // new
      case 0xbb: {
        const classIndex = (code[pc++] << 8) | code[pc++];
        stack.push(jvm.newInstance(method.owner.getClassName(classIndex)));
        break;
      }

      // newarray
      case 0xbc: {
        const count = stack.pop() | 0;
        const atype = code[pc++];
        const componentType =
          atype === 4
            ? "Z"
            : atype === 5
              ? "C"
              : atype === 6
                ? "F"
                : atype === 7
                  ? "D"
                  : atype === 8
                    ? "B"
                    : atype === 9
                      ? "S"
                      : atype === 10
                        ? "I"
                        : atype === 11
                          ? "J"
                          : null;

        if (!componentType)
          throw new Error(`Unsupported newarray atype ${atype}`);
        stack.push(createJvmArray(count, componentType, 0));
        break;
      }

      // anewarray
      case 0xbd: {
        const count = stack.pop() | 0;
        const classIndex = (code[pc++] << 8) | code[pc++];
        const componentType = `L${method.owner.getClassName(classIndex)};`;
        stack.push(createJvmArray(count, componentType, null));
        break;
      }

      // arraylength
      case 0xbe: {
        const arrayRef = ensureJvmArray(stack.pop());
        stack.push(arrayRef.elements.length | 0);
        break;
      }

      // athrow
      case 0xbf: {
        const exception = stack.pop();
        console.error(
          "J2ME Exception thrown:",
          exception?.__class?.className,
          exception,
        );
        // For now, just return to avoid crashing. Real impl would search exception handlers.
        return undefined;
      }

      // checkcast
      case 0xc0: {
        // Skip the class index, keep the value on stack (permissive - always pass)
        pc += 2;
        break;
      }

      // instanceof
      case 0xc1: {
        const classIndex = (code[pc++] << 8) | code[pc++];
        const targetClassName = method.owner.getClassName(classIndex);
        const objRef = stack.pop();
        if (objRef == null) {
          stack.push(0);
        } else {
          // Simple check: walk the class hierarchy
          let match = false;
          let cls = objRef.__class;
          while (cls) {
            if (cls.className === targetClassName) {
              match = true;
              break;
            }
            cls = cls.superName ? jvm.loadClass(cls.superName) : null;
          }
          stack.push(match ? 1 : 0);
        }
        break;
      }

      // monitorenter, monitorexit (no-op in single-thread)
      case 0xc2:
      case 0xc3:
        stack.pop();
        break;

      // wide
      case 0xc4: {
        const wideOp = code[pc++];
        const wideIndex = (code[pc++] << 8) | code[pc++];

        if (wideOp === 0x84) {
          // wide iinc
          const wideInc = signedShort(code[pc++], code[pc++]);
          locals[wideIndex] = ((locals[wideIndex] ?? 0) | 0) + wideInc;
        } else if (wideOp >= 0x15 && wideOp <= 0x19) {
          // wide load
          stack.push(locals[wideIndex]);
        } else if (wideOp >= 0x36 && wideOp <= 0x3a) {
          // wide store
          locals[wideIndex] = stack.pop();
        } else if (wideOp === 0xa9) {
          // wide ret
          pc = locals[wideIndex] | 0;
        }
        break;
      }

      // multianewarray
      case 0xc5: {
        const classIndex = (code[pc++] << 8) | code[pc++];
        const dimensions = code[pc++];
        const counts = [];
        for (let d = 0; d < dimensions; d++) {
          counts.unshift(stack.pop() | 0);
        }
        // For simplicity, only handle 1D and 2D
        if (dimensions === 1) {
          stack.push(createJvmArray(counts[0], "L", null));
        } else {
          const outer = createJvmArray(counts[0], "[", null);
          for (let i = 0; i < counts[0]; i++) {
            outer.elements[i] = createJvmArray(
              counts.length > 1 ? counts[1] : 0,
              "L",
              dimensions > 2 ? null : 0,
            );
          }
          stack.push(outer);
        }
        break;
      }

      // ifnull, ifnonnull
      case 0xc6:
      case 0xc7: {
        const offset = branch(code, pc);
        pc += 2;
        const value = stack.pop();
        const matched =
          (op === 0xc6 && value == null) || (op === 0xc7 && value != null);
        if (matched) pc += offset - 3;
        break;
      }

      // goto_w
      case 0xc8: {
        const offset =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc = pc - 1 + offset;
        break;
      }

      // jsr_w
      case 0xc9: {
        const offset =
          (code[pc] << 24) |
          (code[pc + 1] << 16) |
          (code[pc + 2] << 8) |
          code[pc + 3];
        pc += 4;
        stack.push(pc);
        pc = pc - 5 + offset;
        break;
      }

      default:
        console.warn(
          `Unsupported opcode 0x${op.toString(16)} at pc=${pc - 1} in ${method.className}.${method.name}${method.descriptor}`,
        );
        // Don't crash - just skip and continue
        break;
    }
  }

  return undefined;
}
