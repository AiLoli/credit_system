<template>
  <PageWrapper :title="`单号: ` + userId" style="height: 70px" contentBackground @back="goBack">
    <template #extra>
      <a-button Button type="primary" danger> 驳回 </a-button>
      <a-button type="primary"> 通过 </a-button>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="创建人"> 周子诚 </a-descriptions-item>
        <a-descriptions-item label="产品"> 借贷服务 </a-descriptions-item>
        <a-descriptions-item label="创建时间"> 2023-04-27 </a-descriptions-item>
        <a-descriptions-item label="备注"> 请于两个工作日内确认 </a-descriptions-item>
      </a-descriptions>
      <a-card title="流程进度" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="提交表单">
            <template #description>
              <div>周子诚</div>
              <p>2016-12-12 12:32</p>
            </template>
          </a-step>
          <a-step title="组长审核">
            <template #description>
              <p>张三</p>
            </template>
          </a-step>
          <a-step title="部门审核" />
          <a-step title="完成" />
        </a-steps>
      </a-card>

      <a-card title="用户信息" :bordered="false" class="mt-5">
        <a-descriptions title="基本信息" :column="3">
          <a-descriptions-item label="姓名"> 付小小 </a-descriptions-item>
          <a-descriptions-item label="性别"> 女 </a-descriptions-item>
          <a-descriptions-item label="年龄"> 25 </a-descriptions-item>
          <a-descriptions-item label="身份证"> 3321944288191034921 </a-descriptions-item>
          <a-descriptions-item label="民族"> 汉族 </a-descriptions-item>
          <a-descriptions-item label="最高学历"> 本科 </a-descriptions-item>
          <a-descriptions-item label="联系方式"> 18112345678 </a-descriptions-item>
          <a-descriptions-item label="联系地址" :span="2">
            付小小 18112345678 浙江省杭州市西湖区黄姑山路工专路交叉路口
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="收入信息" :column="3">
          <a-descriptions-item label="收入类型"> 工资 </a-descriptions-item>
          <a-descriptions-item label="年收入"> 300,000 </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="借贷信息" :column="3">
          <a-descriptions-item label="借贷产品类型"> 产品1 </a-descriptions-item>
          <a-descriptions-item label="预授信金额"> 1,000,000 </a-descriptions-item>
          <a-descriptions-item label="放款卡号"> 2345-2345-2647-2145-157 </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="征信信息" :column="3">
          <a-descriptions-item label="失效信用卡数"> 0 </a-descriptions-item>
          <a-descriptions-item label="未支付个人贷款金额"> 0 </a-descriptions-item>
          <a-descriptions-item label="未支付其他贷款金额"> 0 </a-descriptions-item>
          <a-descriptions-item label="未支付贷款平均金额"> 0 </a-descriptions-item>
          <a-descriptions-item label="五年内未支付贷款金额"> 0 </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { Divider, Card, Descriptions, Steps, Tabs } from 'ant-design-vue';

  export default defineComponent({
    components: {
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      const userId = ref(route.params?.id);

      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/credit/approval');
      }
      return {
        goBack,
        userId,
      };
    },
  });
</script>
