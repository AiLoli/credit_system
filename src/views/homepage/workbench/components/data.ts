interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '贷款管理',
    icon: 'ion:card-outline',
    color: '#4daf1bc9',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '张深深',
    date: '刚刚',
    desc: `提交了 <a>贷款申请表</a> , 需要您的审批`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '艾文',
    date: '1个小时前',
    desc: `提交的 <a>贷款申请表</a> 已完成申请`,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '李成东',
    date: '1天前',
    desc: `提交了 <a>贷款申请表</a> , 需要您的审批`,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: '周星星',
    date: '2天前',
    desc: `提交了 <a>贷款申请表</a> , 需要您的审批`,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '皮特',
    date: '3天前',
    desc: `提交了 <a>贷款申请表</a> , 需要您的审批`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: '华东分部2023年目标',
    icon: 'carbon:logo-github',
    color: '',
    desc: '2023年整体目标制定及规划',
    group: '华东分部',
    date: '2023-02-28',
  },
  {
    title: '华南分部2023年目标',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '2023年整体目标制定及规划',
    group: '华南分部',
    date: '2023-03-01',
  },
  {
    title: '西北分部2023年目标',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '2023年整体目标制定及规划',
    group: '西北分部',
    date: '2023-03-03',
  },
];
