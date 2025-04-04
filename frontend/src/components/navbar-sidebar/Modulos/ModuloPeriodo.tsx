import { RiCalendarLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function ModuloPeriodo() {
  return (
    <li>
            <Link
              to="/periodo"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RiCalendarLine className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="ms-3">Periodos</span>
            </Link>
          </li>
  )
}
