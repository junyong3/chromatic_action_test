import { ComponentStory } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { MSG } from '@constants/MessageCode/msg'
import { within } from '@testing-library/dom'

export function MemberDetailCardAddRunTest(story: ComponentStory<any>) {
  story.play = async ({ canvasElement }) => {
    // Starts querying the component from its root element
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('cardAddDialog') as Element)
    const cardNumber = document.querySelector('[data-cy=cardNumber]') as Element
    const expirationPeriod = document.querySelector(
      '[data-cy=ExpirationPeriod]'
    ) as Element
    const cardPassword = document.querySelector(
      '[data-cy=cardPassword]'
    ) as Element
    const CompanyRegistrationNumber = document.querySelector(
      '[data-cy=CompanyRegistrationNumber]'
    ) as Element
    const cardName = document.querySelector('[data-cy=cardName]') as Element
    const IdentityCheck = document.querySelector(
      '[data-cy=IsIdentityComplete]'
    ) as Element
    const cardAddBtn = document.querySelector('[data-cy=cardAdd]') as Element
    await userEvent.type(
      cardNumber.querySelector('input') as HTMLInputElement,
      '1394929393019312',
      {
        delay: 30,
      }
    )
    await userEvent.type(
      expirationPeriod.querySelector('input') as HTMLInputElement,
      '0328',
      {
        delay: 30,
      }
    )
    await userEvent.type(
      cardPassword.querySelector('input') as HTMLInputElement,
      '12',
      {
        delay: 30,
      }
    )
    await userEvent.type(
      CompanyRegistrationNumber.querySelector('input') as HTMLInputElement,
      '890903',
      {
        delay: 30,
      }
    )
    await userEvent.type(
      cardName.querySelector('input') as HTMLInputElement,
      '스토리북 카드',
      {
        delay: 30,
      }
    )
    await userEvent.click(
      IdentityCheck.querySelector('input') as HTMLInputElement
    )
    await waitFor(() => expect(cardAddBtn).toHaveProperty('disabled', false))
    await userEvent.click(cardAddBtn)
    await waitFor(async () => {
      await expect(canvas.getByText(MSG.SUCCESS.SAVE_CARD).textContent).toBe(
        MSG.SUCCESS.SAVE_CARD
      )
    })
  }

  return story
}
