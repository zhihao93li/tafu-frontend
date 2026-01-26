import { useState } from 'react';
import { Table, Card, Drawer, Descriptions, Tag, Select, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getThemeAnalyses, getThemeAnalysis } from '../../services/adminApi';

const themeLabels = {
  life_color: '生命色彩',
  relationship: '人际关系',
  career_wealth: '事业财富',
  health: '健康运势',
  life_lesson: '人生课题',
  yearly_fortune: '流年运势',
};

export default function AdminThemeAnalysesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [theme, setTheme] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-theme-analyses', page, pageSize, theme],
    queryFn: () => getThemeAnalyses({ page, pageSize, theme: theme || undefined }),
  });

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ['admin-theme-analysis', selectedId],
    queryFn: () => getThemeAnalysis(selectedId),
    enabled: !!selectedId,
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 220,
      ellipsis: true,
    },
    {
      title: '主题',
      dataIndex: 'theme',
      key: 'theme',
      render: (text) => (
        <Tag color="blue">{themeLabels[text] || text}</Tag>
      ),
    },
    {
      title: '命盘',
      key: 'subject',
      render: (_, record) => record.subject?.name || '-',
    },
    {
      title: '用户',
      key: 'user',
      render: (_, record) => record.user?.username || record.user?.phone || '-',
    },
    {
      title: '消耗积分',
      dataIndex: 'pointsCost',
      key: 'pointsCost',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => handleViewDetail(record.id)}>查看详情</a>
      ),
    },
  ];

  const handleViewDetail = (id) => {
    setSelectedId(id);
    setDrawerOpen(true);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>解读管理</h2>
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <span>主题筛选：</span>
          <Select
            placeholder="全部主题"
            allowClear
            style={{ width: 150 }}
            value={theme || undefined}
            onChange={(value) => {
              setTheme(value || '');
              setPage(1);
            }}
            options={Object.entries(themeLabels).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </Space>
      </Card>
      <Table
        columns={columns}
        dataSource={data?.list || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total || 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
      />
      <Drawer
        title="解读详情"
        width={800}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedId(null);
        }}
        loading={detailLoading}
      >
        {detail && (
          <>
            <Descriptions column={2} bordered style={{ marginBottom: 24 }}>
              <Descriptions.Item label="解读 ID" span={2}>
                {detail.id}
              </Descriptions.Item>
              <Descriptions.Item label="主题">
                <Tag color="blue">{themeLabels[detail.theme] || detail.theme}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="消耗积分">
                {detail.pointsCost}
              </Descriptions.Item>
              <Descriptions.Item label="命盘姓名">
                {detail.subject?.name || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="命盘性别">
                {detail.subject?.gender === 'male' ? '男' : '女'}
              </Descriptions.Item>
              <Descriptions.Item label="出生日期">
                {detail.subject ? (
                  `${detail.subject.birthYear}-${String(detail.subject.birthMonth).padStart(2, '0')}-${String(detail.subject.birthDay).padStart(2, '0')} ${String(detail.subject.birthHour).padStart(2, '0')}:${String(detail.subject.birthMinute).padStart(2, '0')}`
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="出生地点">
                {detail.subject?.location || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="所属用户">
                {detail.user?.username || detail.user?.phone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {new Date(detail.createdAt).toLocaleString('zh-CN')}
              </Descriptions.Item>
            </Descriptions>
            <Card title="解读内容" size="small">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 500, overflow: 'auto' }}>
                {JSON.stringify(detail.content, null, 2)}
              </pre>
            </Card>
          </>
        )}
      </Drawer>
    </div>
  );
}
