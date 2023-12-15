import React from 'react';
import {truncateString} from '@assets/helpers/utils/trucateString';
import moment from 'moment';
import './NotificationCard.scss';
import {Card, Icon, Image, Stack} from '@shopify/polaris';
import {MobileAcceptMajor} from '@shopify/polaris-icons';

const NotificationCard = ({
  notification,
  settings = {hideTimeAgo: false, truncateProductName: false}
}) => {
  const {hideTimeAgo, truncateProductName} = settings;
  return (
    <div className="Wrapper">
      <div className="Wrapper-Inner">
        <div className="Wrapper-Inner__ImageContainer">
          <img
            alt={notification.productName}
            src={notification.productImage}
            className="Wrapper-ImageContainer__Image"
          />
        </div>
        <div className="Wrapper-Inner__Content">
          <div className="Wrapper__Content--Title">
            {notification.fistName} in {notification.city}, {notification.country}
          </div>
          <div className="Wrapper__Content--Subtitle">
            purchased{' '}
            {truncateProductName
              ? truncateString(notification.productName, 16)
              : notification.productName}
          </div>
          <div className="Wrapper__Content--Footer">
            {hideTimeAgo ? '' : `${moment(notification.timestamp).fromNow()}`}{' '}
            <span className="Content--Footer__Icon">
              <Icon source={MobileAcceptMajor} color="primary" /> by Avada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationCard;
