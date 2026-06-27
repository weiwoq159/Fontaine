import pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent / "_shared"))
import taskkit


def main() -> None:
    payload = taskkit.read_input()
    taskkit.error(
        "燕云刷酒宏尚未配置具体按键、坐标与循环条件。",
        {"input": payload},
    )


if __name__ == "__main__":
    main()
