import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesByAdmin, getFilteredCourses, setCourseStatus } from '../../../operations/course';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { FiArrowLeft } from 'react-icons/fi';
import LoadingBtn from '../../common/LoadingBtn';

export default function CategoryCourse() {
  const { categoryId } = useParams();
  const categoryName = useLocation().state?.categoryName || 'Catgeory choosed by you';
  const currCourseId = useLocation().state?.currCourseId || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector(store => store.auth);

  useEffect(() => {
    if (categoryId && currUser.token) {
      getCoursesByAdmin(dispatch, categoryId, currUser.token)
    } else {
      return;
    }
  }, [])

  const handleShowCoursenavigation = (courseId) => {
    return navigate(`/dashbord/show/${courseId}`, { state: { returnPath: `/dashbord/getCourseByCategory/${categoryId}` } })
  }

  
  const handleBackToPgae = () => {
    return navigate('/dashbord/categories')
  }
  const CategoryCourse = useSelector(store => store.course);
  const fetching = useSelector(store => store.fetching);
  
  const handleTogle = (courseId) => {
    if (currUser.token) {
      return setCourseStatus(dispatch, courseId, currUser.token);
    } else {
      return
    }
  }

  return (
    <div className={`relative w-full min-h-screen bg-gray-100 p-1 md:p-3`}>

      {/*----------  Back Button----------  */}
      <button
        onClick={handleBackToPgae}
        className="btn flex items-center text-white mb-4 group transition-colors duration-200 bg-indigo-600 border-0 hover:bg-indigo-700 text-[.97rem] mt-[2.4rem] lg:mt-0">
        <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="w-full text-center xl md:2xl lg:text-3xl font-bold text-gray-900 mb-8">All course of <span className='text-indigo-600'>{categoryName}</span>
        </h1>

        {CategoryCourse.length === 0 ?
          (<div className="text-center py-12">
            <p className="text-gray-500 text-lg font-bold md:text-xl">There will no course added yet</p>
          </div>)
          : (
            //  ------------- COurse   -------------
            <div
              className='flex flex-col gap-y-5'>
              {CategoryCourse.map((course, index) => {
                return <div key={course._id} className={`flex items-center justify-between  gap-x-2 bg-white p-2 md:p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 `}>

                  {/*  -------------- Status  ----------- */}
                  <div className='flex items-center justify-start w-[40%] sm:w-[30%] md:w-[25%]'>
                    <label class="inline-flex items-center  cursor-pointer">
                      <input
                        disabled={fetching}
                        checked={course.status === 'Approved'}
                        id={course._id}
                        onChange={() => handleTogle(course._id)}
                        type="checkbox" name='toggle' value="yes" class="sr-only peer" />
                      <div class="relative w-11 h-6 bg-red-600 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>

                      {course.status === 'Draft' ?
                        <span class="bg-red-100 text-red-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded-sm mx-2 ">Draft</span> :
                        <span class="bg-green-100 text-green-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded-sm mx-2">Approved</span>
                      }
                    </label>
                  </div>

                  <div className='flex items-center justify-between flex-1'>
                    {/*  -------------- Name of course  ----------- */}
                    <span className='text-md sm:text-[1.05rem] font-bold text-indigo-600'>{index + 1 + "." + " " + " " + course.courseName}</span>

                    {/*  -------------- Click to view  ----------- */}
                    <span
                      onClick={() => handleShowCoursenavigation(course._id)}
                      className={`p-2 hover:scale-110  transition-colors rounded cursor-pointer ${currCourseId === course._id ? 'bg-gray-200 text-yellow-500 hover:text-yellow-700 ' : ' text-indigo-500 hover:text-indigo-700'}`}
                    >
                      <FaChevronRight size={18} />
                    </span>

                  </div>

                </div>
              })}
            </div>
          )
        }
      </div>
    </div>
  )
}
