import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defaultNamespace = 'fl'
const statePrefix = 'is-'

const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
    let cls = `${namespace}-${block}`
    if (blockSuffix) {
        cls += `-${blockSuffix}`
    }
    if (element) {
        cls += `__${element}`
    }
    if (modifier) {
        cls += `--${modifier}`
    }
    return cls
}

// 定义一个注入键(InjectionKey),用于在Vue组件中注入和获取命名空间
// InjectionKey是TypeScript的类型,用来确保注入值的类型安全
// Ref<string | undefined>表示注入的值是一个ref响应式对象,可以是string或undefined
// 定义一个依赖注入的key，用于在Vue组件中共享命名空间
// InjectionKey<Ref<string | undefined>>表示:
// 1. 这个key对应的值是一个Ref类型
// 2. Ref里面可以是string或undefined
// 3. 使用Symbol确保key的唯一性
export const namespaceContextKey: InjectionKey<Ref<string | undefined>> = Symbol('namespaceContextKey')

// 获取派生的命名空间
// 该函数用于获取组件的命名空间前缀，可以通过参数覆盖默认的命名空间
// 如果没有提供覆盖的命名空间，则尝试从依赖注入中获取，若注入也不存在则使用默认值
export const useGetDerivedNamespace = (namespaceOverrides?: Ref<string | undefined>) => {
    const derivedNamespace = namespaceOverrides || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace))
    const namespace = computed(() => {
        return unref(derivedNamespace) || defaultNamespace
    })
    return namespace
}

export const useNamespace = (block: string, namespaceOverrides?: Ref<string | undefined>) => {
    const namespace = useGetDerivedNamespace(namespaceOverrides)
    //b 是块 用于生成块类名
    const b = (blockSuffix = '') => _bem(namespace.value, block, blockSuffix, '', '')
    //e 是元素 用于生成元素类名
    const e = (element?: string) => (element ? _bem(namespace.value, block, '', element, '') : '')
    //m 是修饰符 用于生成修饰符类名
    const m = (modifier?: string) => (modifier ? _bem(namespace.value, block, '', '', modifier) : '')
    const be = (blockSuffix?: string, element?: string) => (blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, '') : '')
    const em = (element?: string, modifier?: string) => (element && modifier ? _bem(namespace.value, block, '', element, modifier) : '')
    const bm = (blockSuffix?: string, modifier?: string) => (blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, '', modifier) : '')
    const bem = (blockSuffix?: string, element?: string, modifier?: string) => (blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : '')
    const is: {
        (name: string, state: boolean | undefined): string
        (name: string): string
    } = (name: string, ...args: [boolean | undefined] | []) => {
        const state = args.length >= 1 ? args[0]! : true
        return name && state ? `${statePrefix}${name}` : ''
    }

    // for css var
    // --el-xxx: value;
    const cssVar = (object: Record<string, string>) => {
        const styles: Record<string, string> = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${namespace.value}-${key}`] = object[key]
            }
        }
        return styles
    }
    // with block
    const cssVarBlock = (object: Record<string, string>) => {
        const styles: Record<string, string> = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${namespace.value}-${block}-${key}`] = object[key]
            }
        }
        return styles
    }

    const cssVarName = (name: string) => `--${namespace.value}-${name}`
    const cssVarBlockName = (name: string) => `--${namespace.value}-${block}-${name}`

    return {
        namespace,
        b,
        e,
        m,
        be,
        em,
        bm,
        bem,
        is,
        // css
        cssVar,
        cssVarName,
        cssVarBlock,
        cssVarBlockName
    }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
