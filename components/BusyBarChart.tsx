import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { SampleType } from '../models/Sample';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import CustomCardHeader from './CustomCardHeader';

interface ExhibitData {
  _id: string;
  users: number;
  exhibit_a: number;
  exhibit_b: number;
  exhibit_c: number;
  date: string;
  __v: number;
}

interface StackedBarChartProps {
  data: ExhibitData[];
}

function formatTo24HourClock(number) {
  if (typeof number !== 'number' || number < 0 || number > 23) {
    // Handle invalid input
    return 'Invalid input';
  }

  // Use String.padStart() to add zero-padding
  const formattedTime = `${String(number).padStart(1, '0')}:00`;

  return formattedTime;
}

function sortByDate(objects: SampleType[]): SampleType[] {
  // Use the sort method with a custom comparator function
  return objects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function groupDataByHour(data) {
  // Create an array to store the sums for each hour (0-23)
  const hourSums = Array(24).fill(0);

  // Iterate through the data array and calculate sums for each hour
  for (const item of data) {
    const date = new Date(item.date);
    const hour = date.getHours();
    hourSums[hour] += item.passengers;
  }

  // Create an array of objects with hour and sum properties
  const result = hourSums.map((sum, hour) => ({
    hour,
    sum,
  }));

  return result;
}

const BAR_SIZE = 16;

const BusyBarChart = ({ data = [] }: { data: SampleType[] | null }) => {
  const theme = useTheme();

  const cleanedData = useMemo(() => (data ? groupDataByHour(data) : []), [data?.length]);

  const maxDataValue = useMemo(() => {
    const arr = cleanedData?.length ? cleanedData : [];
    return arr?.length > 0 ? Math.max(...arr.map((item) => item.sum)) : 0;
  }, [data?.length]);

  if (!data || data.length <= 0) {
    // return null;
  }

  const calculateOpacity = (value: number) => {
    const val = value / maxDataValue;
    return val;
  };

  const RoundedBar = ({ x, y, width, height, payload }) => {
    const opacity = calculateOpacity(payload.sum);
    return (
      <>
        <rect
          x={x}
          y={y - 5}
          width={width}
          height={height}
          rx={BAR_SIZE / 2} // Adjust the radius to control the roundness of the bars
          ry={BAR_SIZE / 2}
          fill={theme.palette.primary.main}
          fillOpacity={opacity}
        />
      </>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CustomCardHeader header={'Busy Moments'} subheader={''} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={500} height={320} data={cleanedData} margin={{ top: 25 }}>
          <XAxis dataKey="hour" tickFormatter={(payload) => formatTo24HourClock(payload)} interval={'preserveStartEnd'} minTickGap={20} />
          {/* <YAxis dataKey="sum" /> */}
          <Tooltip />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Bar dataKey="sum" barSize={BAR_SIZE} shape={<RoundedBar />}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BusyBarChart;
