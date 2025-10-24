import { defineComponent, PropType, useAttrs } from 'vue'
import { useNamespace } from '@test-ui/hooks'
export default defineComponent({
  name: 'FlInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: {
    'update:modelValue': (value: string) => value
  },
  setup(props, { emit }) {
    const bem = useNamespace('input')
    function handleInput(e: Event) {
      const target = e.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }
    const attrs = useAttrs()
    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e('wapper')}>
            <input
              type="text"
              class={bem.e('inner')}
              placeholder={props.placeholder}
              {...attrs}
              onInput={handleInput}
            />
          </div>
        </div>
      )
    }
  }
})
