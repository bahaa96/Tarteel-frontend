import React, { ReactNode } from 'react';
import {
  injectIntl,
  FormattedHTMLMessage,
  InjectedIntlProps, // eslint-disable-line
} from 'react-intl';
import config from '../../config';
import LOCALE_KEYS from '../locale/keys';

type Props = {
  id: LOCALE_KEYS;
  values?: { [key: string]: string };
  children?: (...formattedMessage: Array<string | JSX.Element>) => ReactNode;
};

const { en } = config('localeMessages');

const T: React.SFC<Props> = ({
  id,
  values,
  children,
  ...rest
}: Props & InjectedIntlProps) => {
  return (
    <FormattedHTMLMessage id={id} defaultMessage={en.messages[id]} values={values} {...rest}>
      {children}
    </FormattedHTMLMessage>
  )
};

// T.propTypes = {
//   id: PropTypes.string.isRequired,
//   values: PropTypes.object, // eslint-disable-line
//   children: PropTypes.node, // eslint-disable-line
// };

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
