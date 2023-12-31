import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { PostRoute } from './routes/posts.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new PostRoute()]);

app.listen();
