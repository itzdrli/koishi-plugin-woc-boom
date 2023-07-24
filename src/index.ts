import { Context, Schema } from 'koishi';

export const name = 'woc-boom';

export interface Config {
  read: boolean;
}

export const Config: Schema<Config> = Schema.object({
  read: Schema.boolean().default(false).description('是否已安装auth插件'),
}).description('我超，boom!');

let intervalId: NodeJS.Timeout | null = null;

function boomWarning(ctx: Context) {
  ctx.logger('woc-boom').warn('当你看到这条信息时，说明你的Koishi面板被爆破辣！快去插件市场安装auth插件吧！\n下次要是还被爆破，就不要怪我启用boom了！');
}

export function apply(ctx: Context) {
  ctx.logger('woc-boom').warn('当你看到这条信息时，说明你的Koishi面板被爆破辣！快去插件市场安装auth插件吧！\n下次要是还被爆破，就不要怪我启用boom了！');

  // Set the interval to execute the boomWarning function every 5 minutes (300000 milliseconds)
  intervalId = setInterval(() => boomWarning(ctx), 300000);

  // Register the beforeShutdown event to clear the interval when the module is unloaded or deactivated
  ctx.on('dispose', () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
}
