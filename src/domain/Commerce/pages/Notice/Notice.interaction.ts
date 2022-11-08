import { ComponentStory } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { MSG } from '@constants/MessageCode/msg'
import { within } from '@testing-library/dom'

export function NoticeCreateRunTest(story: ComponentStory<any>) {
  story.play = async ({ canvasElement }) => {
    // Starts querying the component from its root element
    const canvas = within(canvasElement)
    const title = canvasElement.querySelector('#\\:r2\\:') as Element
    const editor = canvasElement.querySelector('.ql-editor > p') as Element
    const button = canvasElement.querySelector(
      '#page > div:nth-child(1) > div > div > button'
    ) as Element

    // 👇 Simulate interactions with the component data-cy={'title'}
    await userEvent.type(title, '공지 사항 스토리북 테스트 입니다.', {
      delay: 30,
    })
    await userEvent.type(editor, '공지 내용 작성중 압니다.', {
      delay: 30,
    })
    await userEvent.click(button)

    await userEvent.click(
      document.querySelector('[data-cy=dialogSaveButton]') as Element
    )

    await waitFor(async () => {
      console.log(canvas.getByText(MSG.SUCCESS.SAVE_NOTICE).textContent)
      await expect(canvas.getByText(MSG.SUCCESS.SAVE_NOTICE).textContent).toBe(
        MSG.SUCCESS.SAVE_NOTICE
      )
    })
  }

  return story
}
