import { Fragment } from "react";
import Link from 'next/link'

function HomePage(){
    return <Fragment>
        <h1>HOME PAGE</h1>
      <div><Link href="/taskPage/task">Task</Link></div>
      <div><Link href="/taskPage/taskinprogress">Task In Progress</Link></div>
      <div><Link href="/taskPage/taskcompleted">Task Completed</Link></div>
    </Fragment>
}

export default HomePage;