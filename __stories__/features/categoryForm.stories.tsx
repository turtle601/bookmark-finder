import { expect } from '@storybook/jest';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

import ModalLayer from '@/shared/ui/modalLayer';
import CategoryForm from '@/features/autoCategorization/categoryForm';

import * as categoryApi from '@/entities/category/category.api';

import { createMock } from 'storybook-addon-module-mock';
import { queryClient } from '@/shared/lib/react-query';
import { userEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof CategoryForm> = {
  title: 'features/CategoryForm',
  component: CategoryForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div
        css={css({
          width: '340px',
          height: '210px',
        })}
      >
        <ModalLayer.Provider>
          <Story />
        </ModalLayer.Provider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryForm>;

export const TypingCategories: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(categoryApi, 'categoryAIQuery');

        mock1.mockResolvedValue([
          { id: '노션', text: '노션' },
          { id: '여행', text: '여행' },
          { id: 'CS', text: 'CS' },
        ]);

        return [mock1];
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    queryClient.clear();

    const canvas = within(canvasElement);

    const textElement = canvas.getByRole('textbox');

    await userEvent.type(textElement, '헬스', {
      delay: 100,
    });

    userEvent.type(textElement, '{enter}');

    const ul = canvas.getByRole('list');

    await waitFor(() => {
      expect(ul).toHaveTextContent(/헬스/);
    });
  },
};

export const ToggleAI: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(categoryApi, 'categoryAIQuery');
        // const mock2 = createMock(classifyApi, 'createAIBookmarksTypesMutation');

        mock1.mockResolvedValue([
          { id: '노션', text: '노션' },
          { id: '여행', text: '여행' },
        ]);

        return [mock1];
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    queryClient.clear();

    const canvas = within(canvasElement);

    const toggleButton = canvas.getByRole('button', { name: /toggle/i });

    await userEvent.click(toggleButton, { delay: 1000 });

    const ul = canvas.getByRole('list');

    await waitFor(() => {
      expect(ul).not.toHaveTextContent(/노션/);
      expect(ul).not.toHaveTextContent(/여행/);
    });
  },
};
