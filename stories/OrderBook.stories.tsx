import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { OrderBook, Props, Layout } from '../src/OrderBook';
import pkg from '../package.json';

import book from './book';

export default {
  title: 'OrderBook',
  component: OrderBook,
  parameters: {
    componentSubtitle: pkg.description,
  },
  argTypes: {
    listLength: {
      defaultValue: 10,
      description: 'Control how many rows of data appear',
      control: {
        type: 'range',
        min: 2,
        max: 20,
      },
    },
    // askColor: { control: 'color' },
    // bidColor: { control: 'color' },
  },
} as Meta;

const preparedBids = book.bids.slice(0, 15);
const preparedAsks = book.asks.slice(0, 15);
const colorRegex = /\d{1,3}/g;

const parseColor = (color: string | number[]) => {
  if (Array.isArray(color)) {
    return color;
  }

  return color
    .match(colorRegex)
    .slice(0, 3)
    .map((item) => parseInt(item, 10));
};

const Template: Story<Props> = (args) => {
  const props = {
    listLength: 10,
    ...args,
    // Parse the color args.
    askColor: parseColor(args.askColor),
    bidColor: parseColor(args.bidColor),
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <OrderBook book={{ bids: preparedBids, asks: preparedAsks }} {...props} />;
};

export const Default = Template.bind({});

// export const StreamingData = () => {
//   return <OrderBook book={{ bids: book.bids, asks: book.asks }} />;
// };

export const LimitedSize = Template.bind({});

LimitedSize.args = {
  listLength: 5,
};

export const RowLayout = Template.bind({});

RowLayout.args = {
  layout: Layout.Row,
};

export const WithHeaders = Template.bind({});

WithHeaders.args = {
  showHeaders: true,
};

export const WithoutSpread = Template.bind({});

WithoutSpread.args = {
  showSpread: false,
};

export const WithCustomSpread = Template.bind({});

WithCustomSpread.args = {
  spread: '👋',
};

WithCustomSpread.parameters = {
  docs: {
    description: {
      story: `OrderBook
        attempts to calculate the spread by subtracting the top of the
        bids from the top of the asks. If you want to provide your own spread value,
        you can use the \`spread\` prop to do it.
      `,
    },
  },
};

export const WithColors = Template.bind({});

WithColors.args = {
  applyBackgroundColor: true,
};

WithColors.parameters = {
  docs: {
    description: {
      story: `This
        is where things get interesting. OrderBook can calculate colors
        per row of each side of the book. Also, OrderBook will create
        a CSS variable called \`--row-color\`, which you can use to write
        custom styles that take advantage of that color. However, there's
        also a handy \`applyBackgroundColor\` prop that you can use to
        let OrderBook set an inline background-color property for you.
        <br /><br />
        Although that's the only property OrderBook will set, you can still
        use the CSS variable to use each row color in interesting ways, which
        we'll explore in later stories.
      `,
    },
  },
};

export const WithFullOpacity = Template.bind({});

WithFullOpacity.args = {
  applyBackgroundColor: true,
  fullOpacity: true,
};

WithFullOpacity.parameters = {
  docs: {
    description: {
      story: `By
        default, the colors generated by OrderBook set the opacity
        argument of the rgba CSS function. You can disable this
        with the \`fullOpacity\` prop.
      `,
    },
  },
};

export const WithCustomColors = Template.bind({});

WithCustomColors.args = {
  applyBackgroundColor: true,
  askColor: [255, 255, 0],
  bidColor: [0, 255, 255],
};

export const WritingCustomStyles = () => {
  return (
    <div className="with-custom-styles">
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            .with-custom-styles .rob_OrderBook li {
              color: var(--row-color);
              background: #111;
            }
          `,
        }}
      />

      <OrderBook book={{ bids: book.bids, asks: book.asks }} listLength={10} />
    </div>
  );
};

export const CustomColorInterpolation = () => {
  return (
    <div className="custom-color-interpolation">
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            .custom-color-interpolation .rob_OrderBook li {
              color: var(--row-color);
            }
          `,
        }}
      />

      <OrderBook
        book={{ bids: book.bids, asks: book.asks }}
        fullOpacity
        listLength={10}
        interpolateColor={() => {
          return [
            Math.floor(Math.random() * 255) - 1,
            Math.floor(Math.random() * 255) - 1,
            Math.floor(Math.random() * 255) - 1,
          ];
        }}
      />
    </div>
  );
};

CustomColorInterpolation.parameters = {
  chromatic: {
    disable: true,
  },
};

export const MakeItNice = () => {
  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            .MakeItNice {
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              font-size: 13px;
              font-variant-numeric: tabular-nums;
              display: inline-block;
              background-color: #070F15;
              color: rgba(255, 255, 255, 0.6);
              padding: 50px 0;
            }

            .MakeItNice__side-header {
              margin: 0 0 5px 0;
              font-weight: 700;
              text-align: right;
            }

            .MakeItNice__list {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }

            .MakeItNice__list-item {
              cursor: pointer;
              padding: 3px 50px 3px 20px;
              display: flex;
            }

            .MakeItNice__list-item:hover {
              background: rgb(18, 29, 39);
            }

            .MakeItNice__price {
              flex: 0 0 70px;
              color: var(--row-color);
              text-align: right;
              display: inline-block;
              margin-right: 15px;
            }

            .MakeItNice__size {
              flex: 0 0 70px;
            }

            .MakeItNice__spread {
              border-width: 1px 0;
              border-style: solid;
              border-color: rgba(255, 255, 255, 0.2);
              padding: 5px 20px;
              text-align: center;
              display: flex;
            }

            .MakeItNice__spread-header {
              margin: 0 15px 0 0;
              flex: 0 0 70px;
              text-align: right;
            }

            .MakeItNice__spread-value {
              width: 28px;
              overflow: hidden;
            }
          `,
        }}
      />

      <OrderBook
        book={{ bids: book.bids, asks: book.asks }}
        fullOpacity
        interpolateColor={(color) => color}
        listLength={10}
        stylePrefix="MakeItNice"
      />
    </>
  );
};

export const MakeItNiceAgain = () => {
  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            .MakeItNiceAgain {
              background-color: #151825;
              color: rgba(255, 255, 255, 0.6);
              display: inline-block;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              font-size: 13px;
              font-variant-numeric: tabular-nums;
              padding: 50px 0;
            }

            .MakeItNiceAgain__side-header {
              font-weight: 700;
              margin: 0 0 5px 0;
              text-align: right;
            }

            .MakeItNiceAgain__list {
              list-style-type: none;
              margin: 0;
              padding: 0;
            }

            .MakeItNiceAgain__list-item {
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              cursor: pointer;
              display: flex;
              justify-content: flex-end;
            }

            .MakeItNiceAgain__list-item:before {
              content: '';
              flex: 1 1;
              padding: 3px 5px;
            }

            .MakeItNiceAgain__side--bids .MakeItNiceAgain__list-item {
              flex-direction: row-reverse;
            }

            .MakeItNiceAgain__side--bids .MakeItNiceAgain__list-item:last-child {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .MakeItNiceAgain__side--bids .MakeItNiceAgain__size {
              text-align: right;
            }

            .MakeItNiceAgain__list-item:hover {
              background: #262935;
            }

            .MakeItNiceAgain__price {
              border-left: 1px solid rgba(255, 255, 255, 0.1);
              border-right: 1px solid rgba(255, 255, 255, 0.1);
              color: #b7bdc1;
              display: inline-block;
              flex: 0 0 50px;
              margin: 0;
              padding: 3px 5px;
              text-align: center;
            }

            .MakeItNiceAgain__size {
              flex: 1 1;
              margin: 0;
              padding: 3px 5px;
              position: relative;
            }

            .MakeItNiceAgain__size:before {
              background-color: var(--row-color);
              content: '';
              height: 100%;
              left: 0;
              opacity: 0.08;
              position: absolute;
              top: 0;
              width: 100%;
            }
          `,
        }}
      />

      <OrderBook
        book={{ bids: book.bids, asks: book.asks }}
        fullOpacity
        interpolateColor={(color) => color}
        listLength={10}
        stylePrefix="MakeItNiceAgain"
        showSpread={false}
      />
    </>
  );
};
