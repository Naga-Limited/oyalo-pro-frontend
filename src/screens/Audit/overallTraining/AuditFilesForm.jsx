import React, {Fragment, useEffect, useState} from 'react';
import { Card, Button, Col, Row, Form, Collapse,
  Image
} from 'antd';
// import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';
// import {getAllCategory} from '../../../@app/master/masterSlice';
import apis from '../../../api/stateAPI';
import {useLocation} from 'react-router-dom';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Panel} = Collapse;
import { DoubleRightOutlined } from '@ant-design/icons';


function AuditFilesForm() {
  const {state} = useLocation();
  const navigate = useNavigate();
 // const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({type: []});
 // const [loading, setLoading] = useState(false);
  //const [totalMark, setTotalMark] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const [form] = Form.useForm();

  const editMode = state ? true : false;
  const handleClickBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (state?.data) {
      const category = [];
      const uniqueCategories = [];
      let currentIndex = -1;
      (state?.data || []).forEach((d) => {
        if (!uniqueCategories.includes(d?.category_name)) {
          uniqueCategories.push(d?.category_name);
          category.push({...d, subcategory: []});
          currentIndex++;
        } else {
          if (d?.auditpoint_id) {
            category[currentIndex]?.subcategory?.forEach((s) => {
              if (d?.subcategory_name === s?.subcategory_name) s?.auditpoint?.push(d);
            });
          } else category[currentIndex]?.subcategory?.push({...d, name: d?.subcategory_name, auditpoint: []});
        }
      });
      setFormData({...state, category});
    } else {
      apis.getAllFiles().then((res) => {
        if (res.data.status === 200) {
             const data = res.data.data.type || [];
           const categoryList = data
            .filter(
              (li) => li.description !== undefined && li.description.length > 0
            )
            .map((cat) => {
              // let description = cat.description                
                let categoryItem = {
                type_name: cat.type_name,
                description:cat.description,
                file_name:cat.file_name,
                video:cat.video,
                document:cat.file_doc,
               // description
                };
             return categoryItem;
            });

          const type = categoryList.filter(
            (li) => li.description !== undefined && li.description.length > 0
          );
          const initialValue = {
            current_date: "",
            from_date: state?.from_date || "",
            to_date: state?.from_date || "",
            capa_mark: "pass",
            status: "1",
            type
          };
          setFormData(initialValue);
        }
      });
    }
  }, []);


  const formatDate = (date) => date?.split('/').join('-');
  const viewDateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];
  const date = new Date();



  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              form={form}
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              //onFinish={editMode ? onEditFinish : onFinish}
              autoComplete='off'
              initialValues={{
                startDate: editMode ? dayjs(formatDate(state?.from_date), viewDateFormat[0]) : dayjs(date),
                endDate: editMode ? dayjs(formatDate(state?.to_date), viewDateFormat[0]) : dayjs(date.setMonth(date.getMonth() + 1))
              }}>
              <Row gutter={[15, 0]}>
               
                <Col span={24}>
                  {formData.type !== 0
                    ? formData.type
                        .filter((li) => li?.description !== undefined && li?.description.length > 0)
                        .map((cat, i) => {
                          return (
                            <Collapse accordion key={i}
                            className='d-flex flex-column'
                            expandIcon={({ isActive }) => <DoubleRightOutlined rotate={isActive ? 90 : 0} />}>
                              <Panel
                              accordion
                                header={
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between'
                                    }}>
                                    <label>{cat.type_name}</label>
                                  
                                  </div>
                                }
                                key='1'>
                                <Collapse accordion key={i} expandIcon={({ isActive }) => <DoubleRightOutlined rotate={isActive ? 90 : 0} />}>                                
                                  {cat?.description !== undefined
                                    ? cat.description.map((cat, j) => {
                                        if (cat.description !== undefined && cat.description.length > 0) {
                                          return (
                                            <Panel
                                              key={j}
                                              accordion
                                              header={
                                                <div
                                                  style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                  }}>
                                                  <span>{cat.description}</span>
                                                  <Form.Item
                                                    style={{height: '2px'}}
                                                    name='sub_name'
                                                    rules={[
                                                      {
                                                        required: false,
                                                        message: 'Please select sub category'
                                                      }
                                                    ]}>                                                   
                                                    <span style={{display: 'none'}}>{cat.description}</span>
                                                    </Form.Item>
                                                </div>
                                              }>
                                              <Row gutter={[15, 0]}>
                                                <Col md={{span: 18}} xs={{span: 16}}>
                                                 <Form.Item>
                                                 
                                                 <div className='d-flex justify-content-start'>
                                                 <Col md={{span: 7}} xs={{span: 5}}>
                                                              <Image 
                                                                         width={200}
                                                                         height={200}
                                                                          style={{ padding: "15px", border: "2px"}}
                                                                          justifyContent= 'space-between'
                                                                        // width={150}
                                                                        //  height={150}
                                                                         alt='No Image'                                   
                                                                 src={cat.file_name}/>
                                                                 </Col>
                                                                 <Col md={{span: 7}} xs={{span: 5}}>
                                                                  <video
                                                                      width={200}
                                                                      height={200}
                                                                        //style={{ padding: "12px", border: "2px" }}
                                                                        controls
                                                                        alt="No Video"
                                                                        src={cat.video}
                                                                      ></video>  
                                                                      </Col>
                                                                      <Col md={{span: 7}} xs={{span: 5}}>
                                                                      <iframe
                                                                      // style={{ padding: "12px", border: "2px" }}
                                                                      width={200}
                                                                      height={200}
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                                                                        allowfullscreen="allowfullscreen"
                                                                        // controls
                                                                        alt="No Document"
                                                                        src={cat.document}
                                                                      ></iframe>
                                                                      </Col>
                                                            {/* </span> */}
                                                          </div>                                                     
                                                  </Form.Item>
                                                </Col>
                                               
                                              </Row>
                                            </Panel>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })
                                    : null}
                                </Collapse>
                              </Panel>
                            </Collapse>
                          );
                        })
                    : 'No Data'}
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter', marginTop: '20px'}}>
                    <Col span={12} style={{textAlign: 'right'}} >
                     
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                      <Button onClick={handleClickBack}>Back</Button>
                        </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter'}}>
                   
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

export default AuditFilesForm;
