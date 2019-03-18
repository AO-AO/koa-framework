class BaseConfig {
    public static logger: {
        rotate: {
            datePattern: 'YYYY-MM-DD-HH',  // 决定rotate频率
            maxFiles: '1d',  // 日志留存时间
        }
    };
}

export default BaseConfig;
