import {
  ZodDefault,
  ZodFirstPartyTypeKind,
  ZodObject
} from "./chunk-2G5RBZIS.js";
import {
  cleanupNonNestedPath,
  isNotNestedPath
} from "./chunk-SAREPCNB.js";
import "./chunk-3GOOGFKQ.js";
import "./chunk-WD2BNHP7.js";

// node_modules/@vee-validate/zod/dist/vee-validate-zod.esm.js
var isObject = (obj) => obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);
function isIndex(value) {
  return Number(value) >= 0;
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function getTag(value) {
  if (value == null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function merge(target, source) {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      merge(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}
function normalizeFormPath(path) {
  const pathArr = path.split(".");
  if (!pathArr.length) {
    return "";
  }
  let fullPath = String(pathArr[0]);
  for (let i = 1; i < pathArr.length; i++) {
    if (isIndex(pathArr[i])) {
      fullPath += `[${pathArr[i]}]`;
      continue;
    }
    fullPath += `.${pathArr[i]}`;
  }
  return fullPath;
}
function toTypedSchema(zodSchema, opts) {
  const schema = {
    __type: "VVTypedSchema",
    async parse(value) {
      const result = await zodSchema.safeParseAsync(value, opts);
      if (result.success) {
        return {
          value: result.data,
          errors: []
        };
      }
      const errors = {};
      processIssues(result.error.issues, errors);
      return {
        errors: Object.values(errors)
      };
    },
    cast(values) {
      try {
        return zodSchema.parse(values);
      } catch (_a) {
        const defaults = getDefaults(zodSchema);
        if (isObject(defaults) && isObject(values)) {
          return merge(defaults, values);
        }
        return values;
      }
    },
    describe(path) {
      if (!path) {
        return {
          required: !zodSchema.isOptional(),
          exists: true
        };
      }
      const description = getSchemaForPath(path, zodSchema);
      if (!description) {
        return {
          required: false,
          exists: false
        };
      }
      return {
        required: !description.isOptional(),
        exists: true
      };
    }
  };
  return schema;
}
function processIssues(issues, errors) {
  issues.forEach((issue) => {
    const path = normalizeFormPath(issue.path.join("."));
    if (issue.code === "invalid_union") {
      processIssues(issue.unionErrors.flatMap((ue) => ue.issues), errors);
      if (!path) {
        return;
      }
    }
    if (!errors[path]) {
      errors[path] = { errors: [], path };
    }
    errors[path].errors.push(issue.message);
  });
}
function getDefaults(schema) {
  if (!(schema instanceof ZodObject)) {
    return void 0;
  }
  return Object.fromEntries(Object.entries(schema.shape).map(([key, value]) => {
    if (value instanceof ZodDefault) {
      return [key, value._def.defaultValue()];
    }
    if (value instanceof ZodObject) {
      return [key, getDefaults(value)];
    }
    return [key, void 0];
  }));
}
var toFieldValidator = toTypedSchema;
var toFormValidator = toTypedSchema;
function getSchemaForPath(path, schema) {
  if (!isObjectSchema(schema)) {
    return null;
  }
  if (isNotNestedPath(path)) {
    return schema.shape[cleanupNonNestedPath(path)];
  }
  const paths = (path || "").split(/\.|\[(\d+)\]/).filter(Boolean);
  let currentSchema = schema;
  for (let i = 0; i <= paths.length; i++) {
    const p = paths[i];
    if (!p || !currentSchema) {
      return currentSchema;
    }
    if (isObjectSchema(currentSchema)) {
      currentSchema = currentSchema.shape[p] || null;
      continue;
    }
    if (isIndex(p) && isArraySchema(currentSchema)) {
      currentSchema = currentSchema._def.type;
    }
  }
  return null;
}
function getDefType(schema) {
  return schema._def.typeName;
}
function isArraySchema(schema) {
  return getDefType(schema) === ZodFirstPartyTypeKind.ZodArray;
}
function isObjectSchema(schema) {
  return getDefType(schema) === ZodFirstPartyTypeKind.ZodObject;
}
export {
  toFieldValidator,
  toFormValidator,
  toTypedSchema
};
/*! Bundled license information:

@vee-validate/zod/dist/vee-validate-zod.esm.js:
  (**
    * vee-validate v4.12.4
    * (c) 2023 Abdelrahman Awad
    * @license MIT
    *)
*/
//# sourceMappingURL=@vee-validate_zod.js.map
