import React from 'react';
import {Button, DisplayText, Icon, Link, Stack, Thumbnail, TopBar} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {
  BugMajor,
  MobileCancelMajor,
  MobileHamburgerMajor,
  PaymentsMajor
} from '@shopify/polaris-icons';
import isLocal from '@assets/helpers/isLocal';
import {docLink} from '@assets/config/menuLink';
import InfoIcon from '@assets/resources/icons/info.svg';
import NotificationIcon from '@assets/resources/icons/notification.svg';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';
import '@assets/styles/layout/topbar.scss';
import {isShopUpgradable} from '@assets/services/shopService';
import {useStore} from '@assets/reducers/storeReducer';
import useConfirmSheet from '@assets/hooks/popup/useConfirmSheet';
import AppNewsSheet from '@assets/components/AppNews/AppNewsSheet';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const {state} = useStore();
  const {shop} = state;

  const {sheet: newsSheet, openSheet: openNewsSheet} = useConfirmSheet({Content: AppNewsSheet});

  return <TopBar userMenu={<TopBar.UserMenu name="Avada" initials="A" />} />;
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
