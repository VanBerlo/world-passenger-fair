import dynamic from 'next/dynamic';

import { IResponse } from '../interfaces/response.interface';
import { SampleType } from '../models/Sample';
import { useEffect, useState } from 'react';

const IndexPage = dynamic(() => import('../components/IndexPage'), { ssr: false });

export default function Home() {
  return <IndexPage />;
}
