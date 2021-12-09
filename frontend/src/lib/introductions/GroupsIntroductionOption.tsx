import React from 'react'
import { useValues } from 'kea'
import { LockOutlined } from '@ant-design/icons'
import Select from 'rc-select'
import { Link } from 'lib/components/Link'
import { groupsAccessLogic, GroupsAccessStatus } from 'lib/introductions/groupsAccessLogic'
import { IconOffline } from 'lib/components/icons'

export function GroupsIntroductionOption({ value }: { value: any }): JSX.Element | null {
    const { groupsAccessStatus, upgradeLink } = useValues(groupsAccessLogic)

    if (
        ![GroupsAccessStatus.HasAccess, GroupsAccessStatus.HasGroupTypes, GroupsAccessStatus.NoAccess].includes(
            groupsAccessStatus
        )
    ) {
        return null
    }

    return (
        <Select.Option
            key="groups"
            value={value}
            disabled
            style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                backgroundColor: 'var(--bg-side)',
                color: 'var(--text-muted)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span>
                    <LockOutlined style={{ marginRight: 4, color: 'var(--warning)' }} />
                    Unique groups
                    <Link
                        to="https://posthog.com/docs/user-guides/group-analytics?utm_medium=in-product&utm_campaign=group-analytics-learn-more"
                        target="_blank"
                        data-attr="group-analytics-learn-more"
                        style={{ marginLeft: 8, fontWeight: 'bold' }}
                    >
                        Learn more
                    </Link>
                </span>

                {groupsAccessStatus !== GroupsAccessStatus.HasAccess && (
                    <Link to={upgradeLink} target="_blank" style={{ marginLeft: 8 }}>
                        <IconOffline style={{ height: 20, width: 20 }} />
                    </Link>
                )}
            </div>
        </Select.Option>
    )
}
