<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
        <a-button @click="showExcelModal">Excel导入</a-button>
        <a-modal v-model:visible="visible" title="上传Excel文件" @ok="handleOk">
          <a-button style="left: 170px" type="primary" class="my-4" @click="handleDownloadByBase64">
            模版下载
          </a-button>
          <a-upload
            v-model:file-list="fileList"
            name="file"
            style="position: absolute; top: 10px; left: 100px"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            accept=".xls,.xlsx"
            @change="handleChange"
          >
            <a-button style="left: 200px"> 选择文件 </a-button>
          </a-upload>
        </a-modal>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList } from '/@/api/demo/system';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { message, Upload, Modal } from 'ant-design-vue';
  import type { UploadChangeParam } from 'ant-design-vue';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { downloadByBase64 } from '/@/utils/file/download';
  import template from './template';

  export default defineComponent({
    name: 'AccountManagement',
    components: {
      [Upload.name]: Upload,
      [Modal.name]: Modal,
      BasicTable,
      PageWrapper,
      DeptTree,
      AccountModal,
      TableAction,
    },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '账号列表',
        api: getAccountList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
        },
      });
      const visible = ref<boolean>(false);

      const showExcelModal = () => {
        visible.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleImport() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      const handleChange = (info: UploadChangeParam) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      };

      const fileList = ref([]);

      function handleDownloadByBase64() {
        downloadByBase64(template, '模版.xlsx');
      }

      return {
        visible,
        handleDownloadByBase64,
        handleOk,
        showExcelModal,
        handleChange,
        fileList,
        registerTable,
        registerModal,
        handleCreate,
        handleImport,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
