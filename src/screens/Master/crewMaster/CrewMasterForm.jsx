import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Form, Input, Radio, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { addCrewMaster, updateCrewMaster, getDefinitionsList } from '../../../@app/subMaster/subMasterSlice';
import { transStatus } from '../../../util/transStatus';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { map } from 'ramda';
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";
const { Option } = Select;

function CrewMasterForm({ mode }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const {state} = useLocation();
  const [selectedOutlet, setSelectedOutlet] = useState(false);
  const [selectedType,setSelectedType] = useState('');
  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [showDialog, setShowDialog] = useState(false);
  const loginType = useSelector((state) => state.auth.type);
  let outlet_id = selectedOutlet.id;
  
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );

  const {
    getOutletMasterResponse: { data: outletData }
  } = useSelector((state) => {
    return state.master;
  });
  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const { savingState } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);


  const [definitions, setdefinitions] = useState([]);
  useEffect(() => {
    dispatch(getDefinitionsList())
    .then((result) => {
      if (result && Array.isArray(result.data)) {
        const defTitle1Objects = result.data.filter((item) => item.def_title_id === 6);
        setdefinitions(defTitle1Objects); // Set for def_title_id 1
      }
    });
    
  }, [dispatch]);



  const {
   gettingDefinitionsList,
   savingDefinitionsList   
  } = useSelector((state) => {
    return state.subMaster;
  });
  const { userData } = useSelector((state) => state.auth);
  
  const onFinish = (data) => {   
    const outlet = selectedOutlet.id || data.outlet_id;   
    const definition_name = selectedType.def_list_code || data?.definition_id;  
    const phone_no = data.phone_no;  
    const name = data.name;
    const emp_code = data.emp_code;
    const joining_date = data.joining_date;
    const relieving_date = data.relieving_date;
    dispatch(defaultValue?.id ? 
      updateCrewMaster({data: {  ...data, 
        outlet,
        name,
        phone_no,
        emp_code,
        definition_name,
        joining_date,
        relieving_date,
        status: transStatus({status}), 
        id: defaultValue.id,
        updated_by: userData.data?.id ?? "0",
      }}) 
    : addCrewMaster(
      {data:{
      outlet_id,
      outletcode:data?.outlet_id,
      created_by: userData.data?.id ?? "0",
      definition_name:data?.definition_name ,
      name:data?.name,
      phone_no: data?.phone_no,
      status:data?.status,    
      emp_code:data?.emp_code,
      joining_date:data?.joining_date,
      relieving_date:data?.relieving_date}}
      //{data: {status, outlet_id:data.outlet_id,created_by: userData.data?.id ?? "0"}}
      )).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        setShowDialog(false);
        navigate('/crewMaster');
      }
    });
  };
  const {
    register,
    control,
    //formState: { errors }
  } = useForm();


  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const currentdate = [year, month, day].join("-");
  const [date, setDate] = useState(currentdate);

  var changedate = new Date(); // today!

  var x = 5; // go back 5 days!
  var fifthday = [year, month, "05"].join("-"); //To Restrict Date before 5th of everymonth

  changedate.setDate(changedate.getDate() - x);
  const cyear = changedate.getFullYear();
  const cmonth = String(changedate.getMonth() + 1).padStart(2, "0");
  const cday = String(changedate.getDate()).padStart(2, "0");
  const previous = [cyear, cmonth, cday].join("-");
  const handleClickBack = () => {
    navigate('/crewMaster');
  };

  let newDate;
  const onchangedate = (e) => {
    newDate = e.target.value;
    setDate(newDate);
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: 'center' }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              disabled={savingDefinitionsList}
              form={form}
              initialValues={{
                name: defaultValue?.def_list_name,
                emp_code:defaultValue?.emp_code,
                outlet_id: defaultValue?.outlet_id,
                phone_no: defaultValue?.phone_no,
                joining_date: defaultValue?.joining_date,
                relieving_date: defaultValue?.relieving_date,
                definition_name:defaultValue?.def_list_code,
                // status: defaultValue?.status == 'Active' ? '1' : '0',
                status: defaultValue?.status ?? 1,
               ...defaultValue}}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Name' 
                  rules={[
                      {
                        required: true,
                        message: 'Please enter your contact No'
                      }]}>
                    <Input placeholder='Enter Name' />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='emp_code' label='ORL Employee Code'>
                    <Input  defaultValue={defaultValue?.emp_code} name='emp_code' placeholder='Enter Employee Code' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='outlet_id' label='Outlet Name'>
                  <Controller
                      control={control}
                      name="outlet_id"
                      render={({ field: { onChange } }) => (
                        <Select
                          {...register("outlet_id", {
                            required: mode === "add"
                          })}
                          disabled={mode === "edit"}
                          defaultValue={defaultValue?.outlet_id}
                          placeholder="Select"
                          showSearch
                          onChange={(e) => {
                            onChange(e);
                            setSelectedOutlet(
                              (outletList ?? [])?.find(
                                (outlet) => outlet.id === e
                              )
                            );
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (outlet) => {
                              return (
                                <Option key={outlet?.id} value={outlet?.id}>
                                  {outlet?.outlet_code}
                                </Option>
                              );
                            },
                            outletList ? outletList.filter((e) => {
                              if (loginType === 2) {
                                let fid =
                                  emp_map &&
                                  emp_map.outlet.findIndex(
                                    (x) => Number(x.id) === Number(e.id)
                                  );
                                if (fid !== -1 && e.status == '1') return true;
                                else return false;
                              } else return e.status == '1';
                            })
                              : []
                          )}
                        </Select>
                      )}
                    />

                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='phone_no' label='Phone No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your contact No'
                      },

                      {
                        pattern: /^[5-9][0-9]{9}$/g,
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                    <Input placeholder='Enter Phone No' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                <Form.Item name='definition_id' hidden={true}>
                  <Input disabled value={state?.definition_id} ></Input>
                </Form.Item>
                  <Form.Item name='definition_name' label='Type' rules={[
                      {
                        required: true,
                        message: 'Please enter your contact No'
                      }]}>

                  <Select

                      placeholder='Select'
                      loading={gettingDefinitionsList}
                      disabled={savingDefinitionsList}
                      defaultValue={defaultValue?.definition_name}
                      onChange={(e) => {                       
                        setSelectedType( (definitions ?? [])?.find(
                          (definitions) => definitions.def_list_code === e
                        ));                      
                      }}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (definitions) => {
                          return (
                            <Option key={definitions.def_list_code} value={definitions.def_list_code}>
                              {definitions.def_list_name}
                            </Option>
                          );
                        },
                        definitions ? definitions?.filter((e) => e.status == '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='joining_date' label='Joining Date' 
                  //</Col>rules={[{required: true, message: 'Enter Type'}]}
                  >
                    <Input
                      type="date"
                      selected={date}
                      name="joining_date"
                      placeholder="Select date"
                      defaultValue={defaultValue?.join_date}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedate}
                     // value={date}
                      //format={dateFormat}
                    />
                  </Form.Item>
                 </Col>
                 <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='relieving_date' label='Relieving Date' 
                  //</Col>rules={[{required: true, message: 'Enter Type'}]}
                  >
                    <Input
                      type="date"
                      selected={date}
                      name="relieving_date"
                      placeholder="Select date"
                      defaultValue={defaultValue?.relieving_date}
                    //  defaultValue={currentdate}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedate}
                      value={date}
                    //format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='status' label='Status' rules={[{ required: true, message: 'Please slect your status' }]}>
                  <Col span={24}>
                      <Col span={24}>
                        <Radio.Group
                          buttonStyle="solid"
                          onChange={(e) => {
                            setStatus(e?.target?.value);
                          }}
                          size="small"
                          defaultValue={
                            defaultValue?.status === "In Active" ? 0 : 1
                          }
                        >
                          <Radio.Button className="active" value={1}>
                            Active
                          </Radio.Button>
                          <Radio.Button className="in-active" value={0}>
                            In-Active
                          </Radio.Button>
                        </Radio.Group>
                      </Col>
                    </Col>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={12} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingState} loading={savingState}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingState}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default CrewMasterForm;
