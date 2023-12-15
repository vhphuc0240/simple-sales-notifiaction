import React, {useState} from 'react';
import {Card, Page, ResourceItem, ResourceList, Stack} from '@shopify/polaris';
import NotificationCard from '@assets/components/NotificationCard/NotificationCard';
import moment from 'moment/moment';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';

const NotificationSamples = [
  {
    id: 1,
    fistName: 'John',
    city: 'New York',
    productName: 'Product 1',
    country: 'USA',
    productId: '123456',
    timestamp: Date.now(),
    productImage: 'https://picsum.photos/70'
  },
  {
    id: 2,
    fistName: 'John 2',
    city: 'New York',
    productName: 'Product 2',
    country: 'USA',
    productId: '123456',
    timestamp: Date.now(),
    productImage: 'https://picsum.photos/70'
  },
  {
    id: 3,
    fistName: 'John',
    city: 'New York',
    productName: 'Product 3',
    country: 'USA',
    productId: '123456',
    timestamp: Date.now(),
    productImage: 'https://picsum.photos/70'
  },
  {
    id: 4,
    fistName: 'John 3',
    city: 'New York',
    productName: 'Product 4',
    country: 'USA',
    productId: '123456',
    timestamp: Date.now(),
    productImage: 'https://picsum.photos/70'
  }
];
export default function Notifications() {
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const resolveItemIds = ({id}) => {
    return id;
  };
  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notifcation from Shopify">
      <Card>
        <ResourceList
          items={NotificationSamples}
          resourceName={{singular: 'notification', plural: 'notifications'}}
          selectedItems={selectedNotifications}
          onSelectionChange={setSelectedNotifications}
          resolveItemId={resolveItemIds}
          totalItemsCount={NotificationSamples.length}
          showHeader
          selectable
          sortOptions={[
            {
              label: 'Newest update',
              value: 'newest'
            }
          ]}
          onSortChange={() => console.log('log')}
          renderItem={notification => (
            <ResourceItem id={notification.id}>
              <Stack alignment="center" distribution="equalSpacing">
                <Stack.Item>
                  <NotificationPopup
                    firstName={notification.fistName}
                    productName={notification.productName}
                    city={notification.city}
                    productImage={notification.productImage}
                    country={notification.country}
                    timestamp={notification.timestamp}
                  />
                </Stack.Item>
                <Stack.Item>
                  <div className="Wrapper-Time">From {moment(notification).format('LL')}</div>
                </Stack.Item>
              </Stack>
            </ResourceItem>
          )}
        />
      </Card>
    </Page>
  );
}
