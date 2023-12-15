import React, {useCallback, useState} from 'react';
import {Card, Layout, Page, Tabs} from '@shopify/polaris';
import {defaultSettings} from '@assets/helpers/defaultSettings';
import DisplayTab from '@assets/pages/Settings/components/DisplayTab/DisplayTab';
import TriggerTab from '@assets/pages/Settings/components/TriggerTab/TriggerTab';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const handleSaveSettings = () => {
    console.log('saved');
    console.log(settings);
  };
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback(selectedTabIndex => setSelectedTab(selectedTabIndex), []);
  const onChangeInput = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      accessibilityLabel: 'Display',
      panelID: 'display',
      child: <DisplayTab settings={settings} onChangeInput={onChangeInput} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      accessibilityLabel: 'Triggers',
      panelID: 'triggers',
      child: <TriggerTab settings={settings} onChangeInput={onChangeInput} />
    }
  ];
  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onClick: handleSaveSettings}}
    >
      <Layout>
        <Layout.Section oneThird>
          <Card sectioned>
            <NotificationPopup
              fistName={'John'}
              city={'New York'}
              productName={'Product 1'}
              country={'USA'}
              productId={'123456'}
              timestamp={Date.now().toString()}
              productImage={'https://picsum.photos/70'}
              settings={{
                truncateProductName: settings.truncateProductName,
                hideTimeAgo: settings.hideTimeAgo
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              {tabs[selectedTab]?.child}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
