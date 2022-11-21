import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SummaryTable from '../components/Dashboard/SummaryTable'
import Entries from '../components/Dashboard/Entries'
import { AppContext } from '../store/appReducers'

const ReportSummary = () => {
const appCtx = useContext(AppContext)
useEffect(()=>{
  appCtx.getReports()
},[])
  return (
    <div>

        <Header/>
        <Entries/>
        <SummaryTable/>
    <Footer/>

    </div>
  )
}

export default ReportSummary