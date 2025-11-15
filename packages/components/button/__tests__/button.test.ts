import { sum } from '../src/button'
import { test, expect } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).equal(3)
})

/**
 * expect.sort 不组件测试，继续跑完剩余的测试
 * expect 验证错误立即终端测试
 */
test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // 将期望标记为失败并继续
  expect.soft(1 + 3).toBe(5) // 不再执行
  expect(1 + 2).toBe(3) // 测试失败并终止执行，所有先前错误将被输出
})

test('expect Object Equality', () => {
  const obj = { a: 1, b: 2 }
  const obj1 = obj
  expect(obj).toEqual(obj1)
  expect.soft({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
  //toEqual 比较值，equal 是比较的地址
  expect.soft({ a: 1, b: 2 }).equal({ a: 1, b: 2 })
})

test('function returned something', () => {
  function getApples() {
    return null
  }
  function getApplesFromStock(stock: string) {
    if (stock === 'Bill') {
      return 13
    }
  }
  //toBeDefined 值不是undefined 时，返回true
  expect(getApples()).toBeDefined()
  //toBeUndefined 值是undefined 时，返回true
  expect(getApplesFromStock('Bill')).toBeUndefined()
})
