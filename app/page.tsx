import ContentListContainer from '@/features/contents/read/components/ContentListContainer';

export default function Home() {
  return (
    <div className='px-8 py-6'>
      <ContentListContainer isMyContent={false} />
    </div>
  );
}
