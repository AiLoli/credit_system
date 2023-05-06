<template>
  <PageWrapper title="贷款申请" contentFullHeight>
    <CollapseContainer title="申请表">
      <BasicForm
        autoFocusFirstItem
        :labelWidth="180"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { cloneDeep } from 'lodash-es';
  import { uploadApi } from '/@/api/sys/upload';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` });

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });

  const schemas: FormSchema[] = [
    {
      field: 'indevidualInfo',
      component: 'Divider',
      label: '个人信息',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '姓名',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'gender',
      component: 'RadioGroup',
      label: '性别',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '男',
            value: '1',
          },
          {
            label: '女',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'age',
      component: 'Input',
      label: '年龄',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'ethnic',
      component: 'Select',
      label: '民族',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '汉族',
            value: '1',
            key: '1',
          },
          {
            label: '壮族',
            value: '2',
            key: '2',
          },
          {
            label: '满族',
            value: '3',
            key: '3',
          },
        ],
      },
    },
    {
      field: 'idCard',
      component: 'Input',
      label: '身份证号',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: '[startTime, endTime]',
      label: '身份证有效期',
      required: true,
      component: 'RangePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: { format: 'HH:mm:ss' },
      },
    },
    {
      field: 'dist',
      component: 'Cascader',
      label: '所在地区',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: '浙江省',
            children: [
              {
                value: 'hangzhou',
                label: '杭州市',
                children: [],
              },
              {
                value: 'ningbo',
                label: '宁波市',
                children: [],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: '江苏省',
            children: [
              {
                value: 'nanjing',
                label: '南京市',
                children: [],
              },
              {
                value: 'yancheng',
                label: '盐城市',
                children: [],
              },
            ],
          },
        ],
      },
    },
    {
      field: 'address',
      component: 'Input',
      label: '家庭地址',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'education',
      component: 'Select',
      label: '最高学历',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '小学',
            value: '1',
            key: '1',
          },
          {
            label: '初中',
            value: '2',
            key: '2',
          },
          {
            label: '高中',
            value: '3',
            key: '3',
          },
          {
            label: '大专',
            value: '4',
            key: '4',
          },
          {
            label: '本科',
            value: '5',
            key: '5',
          },
          {
            label: '硕士',
            value: '6',
            key: '6',
          },
          {
            label: '博士',
            value: '7',
            key: '7',
          },
        ],
      },
    },
    {
      field: 'familyInfo',
      component: 'Divider',
      label: '家庭信息',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name1',
      component: 'Input',
      label: '家庭成员1',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'relation1',
      component: 'Select',
      label: '关系',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '父亲',
            value: '1',
            key: '1',
          },
          {
            label: '母亲',
            value: '2',
            key: '2',
          },
          {
            label: '兄弟姐妹',
            value: '3',
            key: '3',
          },
          {
            label: '其他',
            value: '4',
            key: '4',
          },
        ],
      },
    },
    {
      field: 'phone1',
      component: 'Input',
      label: '手机号码',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: '家庭成员2',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'relation2',
      component: 'Select',
      label: '关系',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '父亲',
            value: '1',
            key: '1',
          },
          {
            label: '母亲',
            value: '2',
            key: '2',
          },
          {
            label: '兄弟姐妹',
            value: '3',
            key: '3',
          },
          {
            label: '其他',
            value: '4',
            key: '4',
          },
        ],
      },
    },
    {
      field: 'phone2',
      component: 'Input',
      label: '手机号码',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'incomeInfo',
      component: 'Divider',
      label: '收入信息',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'incomeType',
      component: 'Input',
      label: '收入类型',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'income',
      component: 'Input',
      label: '年收入',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'incomeProof',
      component: 'Upload',
      label: '上传收入证明',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: {
        api: uploadApi,
      },
    },
    {
      field: 'creditInfo',
      component: 'Divider',
      label: '借贷信息',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'loanProduct',
      component: 'Select',
      label: '借贷产品类型',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '产品1',
            value: '1',
            key: '1',
          },
          {
            label: '产品2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'lmt',
      component: 'Input',
      label: '预授信金额',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'bankCard',
      component: 'Input',
      label: '放款卡号',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'zhengxinInfo',
      component: 'Divider',
      label: '征信信息',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'ncloseCreditCard',
      component: 'Input',
      label: '失效信用卡数',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'unpayIndvLoan',
      component: 'Input',
      label: '未支付个人贷款金额',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'unpayOtherLoan',
      component: 'Input',
      label: '未支付其他贷款金额',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'unpayNormalLoan',
      component: 'Input',
      label: '未支付贷款平均金额',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: '5yearBadloan',
      component: 'Input',
      label: '五年内未支付贷款金额',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }

      return {
        schemas,
        optionsListApi,
        optionsA,
        optionsB,
        valueSelectA,
        valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: (values: any) => {
          console.log('values', values);
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        check,
      };
    },
  });
</script>
