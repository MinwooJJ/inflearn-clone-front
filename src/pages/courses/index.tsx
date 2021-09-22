import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryMenu from '@components/CategoryMenu';
import LectureCard from '@components/lectureCard/LectureCard';
import LectureFilter from '@components/LectureFilter';
import LoadingSpinner from '@components/LoadingSpinner';
import AppLayout from 'src/layouts/AppLayout';
import { RootState } from 'src/redux/reducers';
import { LOAD_ALL_LECTURES_REQUEST } from 'src/redux/reducers/lecture';
import { ILecture } from 'src/redux/reducers/types';

const CoursesSection = styled.section`
  background: white;
`;

const CoursesWrapper = styled.div`
  padding: 2rem 0;
  margin: 0 auto;
  background: white;

  @media screen and (min-width: 1200px) {
    max-width: 1180px;
  }

  @media screen and (min-width: 1473px) {
    max-width: 1440px;
  }
`;

const CoursesHeader = styled.header`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #dedede;
`;

const LectureSearchForm = styled.form`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const LectureSearchInput = styled.input`
  flex: 1 1 300px;
  max-width: 300px;
  height: 36px;
  padding: 5px 9px;
  border: 1px solid #dedede;

  &:focus {
    outline: 0.05cm auto #1dc078;
  }

  &&::placeholder {
    color: #b8b8b8db;
  }
`;

const LectureSearchBtn = styled.button`
  width: 53px;
  height: 36px;
  background: #1dc078;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  margin-left: -1rem;
`;

type ListViewProps = {
  view: string;
};

const ListViewBtn = styled.button<ListViewProps>`
  background: white;
  border: 1px solid #dbdbdb;
  border-right-width: ${(props) => (props.view === 'Grid' ? '0' : '1px')};
  cursor: pointer;
  padding: calc(0.375em - 1px) 0.75em;
  border-radius: ${(props) => (props.view === 'Grid' ? `4px 0 0 4px` : `0 4px 4px 0`)};

  &:hover {
    border-color: #b5b5b5;
  }
`;

const LectureList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 1rem;
`;

const Courses = () => {
  const { mainLectures, loadLectureLoading } = useSelector((state: RootState) => state.lecture);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOAD_ALL_LECTURES_REQUEST });
  }, []);

  const handleSubmit = () => {
    console.log('success!');
  };

  return (
    <AppLayout>
      <CoursesSection>
        <CoursesWrapper>
          <Grid container>
            <Grid item xs={2}>
              <CategoryMenu />
              <LectureFilter />
            </Grid>
            <Grid item xs={10} style={{ padding: '0 0.75rem' }}>
              <CoursesHeader>
                <LectureSearchForm name="lectureSearch" onSubmit={handleSubmit}>
                  <LectureSearchInput type="text" placeholder="강의 검색하기" />
                  <LectureSearchBtn type="submit">검색</LectureSearchBtn>
                </LectureSearchForm>
              </CoursesHeader>
              <nav>카테고리 경로</nav>
              <ListViewBtn type="button" view="Grid">
                <ViewComfyIcon />
              </ListViewBtn>
              <ListViewBtn type="button" view="List">
                <ListIcon />
              </ListViewBtn>
              <span>카드 정렬 선택</span>
              <div>기술검색</div>
              <div className="lecture-list">
                {loadLectureLoading ? (
                  <LoadingSpinner />
                ) : (
                  // view의 값은 router.query.view값 가져와서 사용하기
                  <LectureList>
                    {mainLectures?.map((lecture: ILecture) => (
                      <LectureCard key={lecture.id} lecture={lecture} />
                    ))}
                  </LectureList>
                )}
              </div>
              <div>페이지네이션</div>
            </Grid>
          </Grid>
        </CoursesWrapper>
      </CoursesSection>
      <section>지식공유참여 및 인프런 비즈니스</section>
    </AppLayout>
  );
};

export default Courses;
