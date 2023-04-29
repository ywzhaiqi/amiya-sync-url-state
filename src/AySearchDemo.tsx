import useUrlState from '@ahooksjs/use-url-state';
import React, { useEffect, useRef, useState } from 'react'
import { AySearchList, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField, AnyKeyProps } from 'amiya'
import { List, Space, Avatar, Col, Row } from 'antd'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from './api'
import './AySearchDemo.css'

export default function AySearchDemo() {
  const listRef = useRef<any>();
  const [state, setState] = useUrlState({}, {
    parseOptions: {
      parseBooleans: true,
    }
  });
  const [firstLoad, setFirstLoad] = useState(true)
  // console.log('init state', state)

  const fields: Array<AySearchTableField> = [
    {
      title: "四星",
      key: "isRarity3",
      type: 'switch',
      search: true,
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      search: true,
      dialog: true,
      options: professionOptions
    },
    {
      title: '时间排序',
      key: 'sort_time',
      type: 'switch',
      search: true,
    }
  ]

  useEffect(() => {
    listRef.current.getSearchRef().setFieldsValue(state);
    listRef.current.getSearchRef().submit();
    setFirstLoad(false)
  }, []);

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <AySearchList
        ref={listRef}
        title="列表标题"
        selectionType="checkbox"
        selectShowKey="cn"
        api={listApi}
        fields={fields}
        rowKey="sort_id"
        deleteApi={deleteApi}
        pagination={{
          pageSize: 20
        }}
        onParamsChange={(searchParams: AnyKeyProps) => {
          // 点击提交、重置按钮时，同步 state 到 url
          if (!firstLoad) {
            const { search } = searchParams;
          
            const allKeys = Array.from(new Set([
              ...Object.keys(state),
              ...Object.keys(search),
            ]))
  
            allKeys.forEach(key => {
              if (!(key in search) || search[key] == false) {
                search[key] = undefined;
              }
            })
  
            // console.log("onParamsChange", search);
            setState(search);
          }
        }}
        listHeader={
          <Row
            style={{
              backgroundColor: "#fafafa",
              padding: "12px 24px",
              fontWeight: 500
            }}
          >
            <Col flex="20px">
              <AySearchList.SelectionAll />
            </Col>
            <Col flex="1" style={{ paddingLeft: 8 }}>
              干员信息
            </Col>
            <Col flex="130px">操作</Col>
          </Row>
        }
        renderItem={(record: AnyKeyProps, index: number) => {
          let starMap: AnyKeyProps = {
            5: "⭐️⭐️⭐️⭐️⭐️⭐️",
            4: "⭐️⭐️⭐️⭐️⭐️",
            3: "⭐️⭐️⭐️⭐️",
            2: "⭐️⭐️⭐️",
            1: "⭐️⭐️",
            0: "⭐️"
          };
          return (
            <List.Item
              key={record.sort_id}
              actions={[
                <AyCtrl>
                  <AyAction record={record} action="view">
                    详情
                  </AyAction>
                  <AyAction record={record} action="update">
                    编辑
                  </AyAction>
                  <AyAction record={record} action="delete">
                    删除
                  </AyAction>
                </AyCtrl>
              ]}
            >
              <AySearchList.Selection
                record={record}
                style={{ marginRight: 8 }}
              />
              <List.Item.Meta
                avatar={<Avatar src={record.icon} size="large" />}
                title={
                  <Space>
                    {record.cn} {starMap[record.rarity]}
                  </Space>
                }
                description={record.des || "暂时没有描述。"}
              />
              <div>{record.moredes || "暂时没有干员信息。"}</div>
            </List.Item>
          );
        }}
        dialogFormExtend={{
          fields: fields,
          updateApi,
          addApi
        }}
      >
        <AyAction action="batch-delete">批量删除</AyAction>
        <AyAction action="add">新增</AyAction>
      </AySearchList>
    </>
  );
}