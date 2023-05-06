<template>
  <PageWrapper title="风险预测详情" @back="goBack">
    <a-card title="客户信息" :bordered="false" class="mt-5">
      <Description @register="register" class="mt-4" />
    </a-card>
    <a-card title="风险分析" :bordered="false" style="height: 1000px" class="mt-5">
      <div ref="chartRef" :style="{ height, width, left }"></div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Card } from 'ant-design-vue';

  const mockData = {
    name: '周子诚',
    gender: '男',
    age: '23',
    ethnic: '汉族',
    education: '本科',
    idCard: '3505831998xxxxxx',
    dist: '江苏省盐城市',
    phone: '15695909xxx',
    address: '江苏省盐城市南山区学府路402',
  };
  const schema: DescItem[] = [
    {
      field: 'name',
      label: '姓名',
    },
    {
      field: 'gender',
      label: '性别',
    },
    {
      field: 'ethnic',
      label: '民族',
    },
    {
      field: 'age',
      label: '年龄',
    },
    {
      field: 'idCard',
      label: '身份证号',
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'education',
      label: '最高学历',
    },
    {
      field: 'dist',
      label: '所在地区',
    },
    {
      field: 'address',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { Description, PageWrapper, [Card.name]: Card },
    props: {
      width: {
        type: String as PropType<string>,
        default: '800px',
      },
      height: {
        type: String as PropType<string>,
        default: '800px',
      },
      left: {
        type: String as PropType<string>,
        default: 'calc(50vw - 520px)',
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const route = useRoute();
      const userId = ref(route.params?.id);

      const data = [
        ['2000-06-05', 116],
        ['2000-06-06', 129],
        ['2000-06-07', 135],
        ['2000-06-08', 86],
        ['2000-06-09', 73],
        ['2000-06-10', 85],
        ['2000-06-11', 73],
        ['2000-06-12', 68],
        ['2000-06-13', 92],
        ['2000-06-14', 130],
        ['2000-06-15', 245],
        ['2000-06-16', 139],
        ['2000-06-17', 115],
        ['2000-06-18', 111],
        ['2000-06-19', 309],
        ['2000-06-20', 206],
        ['2000-06-21', 137],
        ['2000-06-22', 128],
        ['2000-06-23', 85],
        ['2000-06-24', 94],
        ['2000-06-25', 71],
        ['2000-06-26', 106],
        ['2000-06-27', 84],
        ['2000-06-28', 93],
        ['2000-06-29', 85],
        ['2000-06-30', 73],
        ['2000-07-01', 83],
        ['2000-07-02', 125],
        ['2000-07-03', 107],
        ['2000-07-04', 82],
        ['2000-07-05', 44],
        ['2000-07-06', 72],
        ['2000-07-07', 106],
        ['2000-07-08', 107],
        ['2000-07-09', 66],
        ['2000-07-10', 91],
        ['2000-07-11', 92],
        ['2000-07-12', 113],
        ['2000-07-13', 107],
        ['2000-07-14', 131],
        ['2000-07-15', 111],
        ['2000-07-16', 64],
        ['2000-07-17', 69],
        ['2000-07-18', 88],
        ['2000-07-19', 77],
        ['2000-07-20', 83],
        ['2000-07-21', 111],
        ['2000-07-22', 57],
        ['2000-07-23', 55],
        ['2000-07-24', 60],
      ];

      const dateList = data.map(function (item) {
        return item[0];
      });
      const valueList = data.map(function (item) {
        return item[1];
      });

      onMounted(() => {
        setOptions({
          visualMap: [
            {
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400,
            },
            {
              show: false,
              type: 'continuous',
              seriesIndex: 1,
              dimension: 0,
              min: 0,
              max: dateList.length - 1,
            },
          ],
          title: [
            {
              left: 'center',
              text: '风险分析1',
            },
            {
              top: '55%',
              left: 'center',
              text: '风险分析2',
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
          xAxis: [
            {
              data: dateList,
            },
            {
              data: dateList,
              gridIndex: 1,
            },
          ],
          yAxis: [
            {},
            {
              gridIndex: 1,
            },
          ],
          grid: [
            {
              bottom: '60%',
            },
            {
              top: '60%',
            },
          ],
          series: [
            {
              type: 'line',
              showSymbol: false,
              data: valueList,
            },
            {
              type: 'line',
              showSymbol: false,
              data: valueList,
              xAxisIndex: 1,
              yAxisIndex: 1,
            },
          ],
        });
      });

      const go = useGo();
      const [register] = useDescription({
        // title: '客户信息',
        bordered: false,
        data: mockData,
        schema: schema,
      });

      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/credit/risk_forecast');
      }
      return { userId, mockData, schema, register, goBack, chartRef };
    },
  });
</script>
