/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table, Tag, Space } from 'antd';
import { EyeTwoTone, EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import {
  getCrossCheckSession,
  deleteCrossCheckSession,
} from '../../store/actions/cross-check-session';

const CrossCheckSessionsTableCreation = (props) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      render: (state) => {
        let color = 'green';
        switch (state) {
          case 'active':
            color = 'green';
            break;
          case 'draft':
            color = 'geekblue';
            break;
          case 'closed':
            color = 'volcano';
            break;
          default:
            color = 'green';
        }
        return <Tag color={color}>{state.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Task',
      dataIndex: 'taskId',
      key: 'taskId',
      render: (task) => <a>{task}</a>,
    },
    {
      title: 'Coefficient',
      dataIndex: 'coefficient',
      key: 'coefficient',
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (action, row) => (
        <Space size="middle" data-id={row.id}>
          <EyeTwoTone twoToneColor="#9254de" />
          <EditTwoTone
            twoToneColor="#ffa940"
            onClick={() => {
              const { getCrossCheckSession } = props;
              getCrossCheckSession(row.key);
            }}
          />
          <CloseCircleTwoTone
            twoToneColor="#ff4d4f"
            onClick={() => {
              const { deleteCrossCheckSession } = props;
              deleteCrossCheckSession(row.key);
            }}
          />
        </Space>
      ),
    },
  ];

  const { tableData, isRedirectToFormReady } = props;

  if (isRedirectToFormReady) {
    return <Redirect to="/cross-check-sessions/cross-check-session-edit-form" />;
  }

  return <Table columns={columns} dataSource={tableData} />;
};

const mapStateToProps = ({ crossCheckSessions }) => ({
  isRedirectToFormReady: crossCheckSessions.isRedirectToFormReady,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCrossCheckSession: (id) => dispatch(getCrossCheckSession(id)),
    deleteCrossCheckSession: (id) => dispatch(deleteCrossCheckSession(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrossCheckSessionsTableCreation);
