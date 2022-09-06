import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import UploadImage from "../../../components/Product/UploadImage";
import { createProduct, getById, updateProduct } from "../../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import UploadTest from "../../../components/Product/UploadTest";
import { ProductTye } from "../../../types/product";

const { TextArea } = Input
const { Option } = Select;

type FormInputs = {
  name: string,
  originalPrice: number,
  saleOffPrice: number,
  categories: string,
  feature: string,
  description: string,
  status: number
}

type ProductsEditProps = {
  handleUPdates: (data: any, id: any) => void
}

const EditProductPage = (props: ProductsEditProps) => {
  const [form] = Form.useForm();
  const [SaleOffPrice, setSaleOffPrice] = useState<number>(0);
  const [OriginalPrice, setOriginalPrice] = useState<number>(0);
  const [mesValidatePrice, setMesValidatePrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [ChangeImage, SetChangeImage] = useState<string>('none');
  const [imagePreview, SetimagePreview] = useState<string>('block');
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    values.image = image
    console.log(values.image)
    console.log('Success:', values);
    try {
      props.handleUPdates(values, id)
      message.success("Cập nhật thành công")
      navigate(-1)
    } catch (err) {
      message.error("Có lỗi xảy ra")
    }
  };
  const getUrl = (url: any) => {
    console.log(url)
    setImage(url)
  }
  const changeOriginalPrice = (e: any) => {
    setOriginalPrice(e)
    if (SaleOffPrice >= e) {
      setMesValidatePrice('Giá khuyến mãi phải thấp hơn giá gốc')
      setMesValidatePrice('')
    }
  }

  const changeSaleOffPrice = (e: any) => {
    setSaleOffPrice(e)
    if (e >= OriginalPrice) {
      setMesValidatePrice('Giá khuyến mãi phải thấp hơn giá gốc')
    } else {
      setMesValidatePrice('')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const { id } = useParams();
  const [products, setProducts] = useState<ProductTye>();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await getById(id);
      setProducts(data[0])
      setImage(data[0].image)
      form.setFieldsValue({
        name: data[0].name,
        originalPrice: data[0].originalPrice,
        saleOffPrice: data[0].saleOffPrice,
        categories: data[0].categories,
        status: data[0].status,
        feature: data[0].feature,
        description: data[0].description
      });
    }

    getProduct()

  }, [])
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Chỉnh sửa
        </Typography.Title>
      </Breadcrumb>
      <Row gutter={16}>

        <Col span={10}>
          <Button onClick={() => { SetChangeImage('block'), SetimagePreview('none') }} type="primary"><span>change Image</span></Button>
          <div style={{ display: `${ChangeImage}` }}>
            <UploadImage onupload={getUrl} />
          </div>

          <div style={{display:`${imagePreview}`}} >
           <ImagePreview style={{}} src={products?.image} alt="Image" />
          </div>
          {/* <UploadTest/> */}
        </Col>
        <Col span={14}>
          <Typography.Title level={5}>Thông tin sản phẩm</Typography.Title>
          <Form
            // name="product"
            form={form} // Add this!
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            labelCol={{ span: 24 }}
          >
            <Form.Item 
              name="name"
              labelCol={{ span: 24 }}
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Tên sản phẩm không được trống' }]}
            >
              <Input  size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="originalPrice"
                  label="Giá gốc"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Gía sản phẩm' }]}
                >
                  <InputNumber defaultValue={products?.originalPrice} onChange={changeOriginalPrice} style={{ width: '100%' }} size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="saleOffPrice"
                  label="Giá giảm"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Gía sản phẩm' }]}
                >
                  <InputNumber defaultValue={products?.saleOffPrice} onChange={changeSaleOffPrice} style={{ width: '100%' }} size="large" />
                </Form.Item>
                <div role="alert" className="ant-form-item-explain-error" >{mesValidatePrice}</div>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phân loại"
                  name="categories"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue={products?.categories} style={{ width: '100%' }} size="large">
                    <Option value="phone">Điện thoại</Option>
                    <Option value="laptop">Laptop</Option>
                    <Option value="tablet">Máy tính bảng</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái(Ẩn/hiện)"
                  name="status"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue={products?.status} style={{ width: '100%' }} size="large">
                    <Option value="hiện">Hiện</Option>
                    <Option value="ẩn">Ẩn</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="feature"
              labelCol={{ span: 24 }}
              label="Đặc điểm nổi bật"
              rules={[{ required: true, message: 'Đặc điểm sản phẩm' }]}
            >
              <TextArea defaultValue={products?.feature} name="feature" />
            </Form.Item>
            <Form.Item
              name="description"
              labelCol={{ span: 24 }}
              label="Mô tả sản phẩm"
              rules={[{ required: true, message: 'Mô tả sản phẩm' }]}
            >
              <TextArea defaultValue={products?.description} name="description" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const Breadcrumb = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const Label = styled.div`
	font-size: 13px;
`
const ImagePreview = styled.img`
    width: 100%;
`
export default EditProductPage