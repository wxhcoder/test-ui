import { defineComponent } from 'vue'
import { useNamespace } from '@test-ui/hooks'
export default defineComponent({
  name: 'FlInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:modelValue': (value: string) => value
  },
  setup(props, { emit }) {
    console.log(props, emit)
    const bem = useNamespace('input')
    function handleInput(e: Event) {
      const target = e.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }
    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e('wapper')}>
            <input
              type="text"
              class={bem.e('inner')}
              value={props.modelValue}
              onInput={handleInput}
            />
          </div>
        </div>
      )
    }
  }
})
