---
name: react-component
description: React 컴포넌트 개발 및 상태 관리. 새로운 UI, 폼, 데이터 시각화가 필요할 때 사용
allowed-tools: Read, Write, Edit, Bash
---

# React 컴포넌트 개발 가이드

## 📋 개발 프로세스

1. **컴포넌트 설계**: UI/UX 요구사항 분석
2. **파일 생성**: 명명 규칙에 따라 파일 생성
3. **Props 정의**: 명확한 인터페이스 설계
4. **상태 관리**: useState, useEffect, Custom Hooks
5. **스타일링**: CSS Modules 또는 Styled Components
6. **테스트**: 주요 기능 테스트 작성

## 🎯 컴포넌트 원칙 (2026 Best Practices)

### 필수 원칙
- ✅ **함수형 컴포넌트**: Class 컴포넌트 대신 Function + Hooks
- ✅ **Props 타입 정의**: PropTypes 또는 TypeScript
- ✅ **단일 책임**: 하나의 컴포넌트는 하나의 역할만
- ✅ **컨테이너/프레젠테이션 분리**: 로직과 UI 분리
- ✅ **재사용성**: 공통 컴포넌트는 `components/common/`에

### 선택적 개선
- 🔧 **Custom Hooks**: 로직 재사용
- 🔧 **Memo화**: 불필요한 리렌더링 방지
- 🔧 **Error Boundaries**: 에러 처리

## 📁 권장 파일 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── common/         # 공통 재사용 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   ├── features/       # 기능별 컴포넌트
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── Chart.jsx
│   │   └── profile/
│   │       ├── ProfileView.jsx
│   │       └── ProfileEdit.jsx
│   └── layout/         # 레이아웃 컴포넌트
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       ├── Footer.jsx
│       └── MainLayout.jsx
├── hooks/              # Custom Hooks
│   ├── useAuth.js
│   ├── useAPI.js
│   ├── useForm.js
│   └── useDebounce.js
├── services/           # API 호출
│   ├── api.js          # Axios 설정
│   └── authService.js
├── utils/              # 유틸리티 함수
│   ├── validators.js
│   ├── formatters.js
│   └── helpers.js
├── constants/          # 상수
│   ├── config.js
│   └── routes.js
├── contexts/           # React Context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
└── styles/             # 전역 스타일
    ├── globals.css
    └── variables.css
```

## 🛠️ 주요 패턴

### 1. 컨테이너/프레젠테이션 패턴

#### ✅ GOOD - 로직과 UI 분리

```jsx
// components/features/dashboard/DashboardContainer.jsx (컨테이너 - 로직)
import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../../../services/dashboardService';
import DashboardView from './DashboardView';
import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage';

const DashboardContainer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return <DashboardView data={data} />;
};

export default DashboardContainer;


// components/features/dashboard/DashboardView.jsx (프레젠테이션 - UI만)
import PropTypes from 'prop-types';
import StatsCard from './StatsCard';
import Chart from './Chart';

const DashboardView = ({ data }) => {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        {data.stats.map((stat, idx) => (
          <StatsCard key={idx} stat={stat} />
        ))}
      </div>
      <Chart data={data.chartData} />
    </div>
  );
};

DashboardView.propTypes = {
  data: PropTypes.shape({
    stats: PropTypes.arrayOf(PropTypes.object).isRequired,
    chartData: PropTypes.object.isRequired,
  }).isRequired,
};

export default DashboardView;
```

#### ❌ BAD - 로직과 UI 혼재

```jsx
const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => { /* data fetch */ }, []);

  return (
    <div>
      {/* 복잡한 UI + 로직이 모두 한 곳에 */}
      {data && (
        <>
          {data.map(item => (
            <div onClick={() => { /* 복잡한 로직 */ }}>
              {/* 복잡한 UI */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
```

### 2. Custom Hooks 패턴

```jsx
// hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // 즉시 검증
    if (touched[name] && validate) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    if (validate) {
      const fieldErrors = validate(values);
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();

    // 모든 필드 검증
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    await onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};


// 사용 예시
const LoginForm = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    validate
  );

  const onSubmit = async (formValues) => {
    console.log('Submitting:', formValues);
    // API call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
};
```

### 3. Props 구조 분해 패턴

```jsx
// ✅ GOOD - 구조 분해로 명확성 향상
const UserCard = ({ name, email, avatar, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

UserCard.defaultProps = {
  avatar: '/default-avatar.png',
};


// ❌ BAD - Props 객체로 전달
const UserCard = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.email}</p>
      {/* props. 반복 */}
    </div>
  );
};
```

### 4. 리스트 렌더링 패턴

```jsx
// components/features/users/UserList.jsx
import PropTypes from 'prop-types';
import UserCard from './UserCard';

const UserList = ({ users, onEdit, onDelete }) => {
  if (!users || users.length === 0) {
    return <div className="empty-state">No users found</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}  // 항상 고유한 key 사용
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          onEdit={() => onEdit(user.id)}
          onDelete={() => onDelete(user.id)}
        />
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
```

### 5. 조건부 렌더링 패턴

```jsx
// ✅ GOOD - 명확한 조건부 렌더링
const Dashboard = ({ user, loading, error }) => {
  // Early return for loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Early return for error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Early return for no user
  if (!user) {
    return <EmptyState message="Please log in" />;
  }

  // Main render
  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <DashboardContent user={user} />
    </div>
  );
};


// ❌ BAD - 중첩된 삼항 연산자
const Dashboard = ({ user, loading, error }) => {
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error} />
  ) : user ? (
    <div>{/* main content */}</div>
  ) : (
    <EmptyState />
  );
};
```

### 6. 에러 바운더리 패턴

```jsx
// components/common/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 여기서 에러 로깅 서비스로 전송 가능
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;


// 사용
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

## 🎨 명명 규칙

### 파일명
```
✅ GOOD:
- Button.jsx (컴포넌트)
- UserProfile.jsx
- DashboardContainer.jsx

❌ BAD:
- button.jsx (소문자)
- user_profile.jsx (snake_case)
- dashboard-container.jsx (kebab-case)
```

### 함수명
```javascript
✅ GOOD:
- handleClick()        // 이벤트 핸들러
- fetchUserData()      // 데이터 가져오기
- isValidEmail()       // Boolean 반환
- formatDate()         // 포맷팅

❌ BAD:
- click()              // 너무 짧음
- getUserDataFromAPI() // 너무 장황
- func1()              // 의미 없음
```

### Custom Hooks
```javascript
✅ GOOD:
- useAuth()
- useForm()
- useDebounce()
- useLocalStorage()

❌ BAD:
- authHook()           // use로 시작하지 않음
- hook1()              // 의미 없음
```

## 🚀 실행 및 개발

### 개발 서버 실행

```bash
# Create React App
npm start

# Vite
npm run dev

# Next.js
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 테스트

```bash
# Jest + React Testing Library
npm test

# 특정 파일 테스트
npm test Button.test.jsx

# 커버리지
npm test -- --coverage
```

## 📚 추가 리소스

- [React 공식 문서](https://react.dev/)
- [React Patterns](https://reactpatterns.com/)
- [React Hook Form](https://react-hook-form.com/)
