/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilPhone, cilEnvelopeOpen } from '@coreui/icons'
import * as UserService from '../../../services/UserService'

const ProfileEdit = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user information and set the state
    const fetchUserData = async () => {
      const userData = await UserService.getUserData()
      setName(userData.data.name || '')
      setEmail(userData.data.email || '')
      setPhone(userData.data.phone || '')
    }
    fetchUserData()
  }, [])

  const handleSave = async () => {
    const updatedUser = { name, email, phone }
    await UserService.updateUserData(updatedUser)
    window.location.reload()
  }

  const handleCancel = () => {
    window.location.reload() // Refresh the page to reload original data
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>Chỉnh sửa thông tin cá nhân</h1>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilEnvelopeOpen} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </CInputGroup>
                <div className="d-grid gap-2">
                  <CButton color="success" onClick={handleSave}>
                    Lưu
                  </CButton>
                  <CButton color="danger" onClick={handleCancel}>
                    Huỷ
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ProfileEdit
